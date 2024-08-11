import crypto from 'node:crypto'
import { Client } from '@notionhq/client'
import { z } from 'zod'
import type { OrderParamsSchemaType } from '~/schema/order'

const site_rul = process.env.NUXT_PUBLIC_SITE_URL

export const PaymentMethods = {
  ALL: 'ALL', // 不指定付款方式，由綠界顯示付款方式選擇頁面
  Credit: 'Credit', // 信用卡及銀聯卡(需申請開通)
  WebATM: 'WebATM', // 網路ATM
  ATM: 'ATM', // 自動櫃員機
  CVS: 'CVS', // 超商代碼
  BARCODE: 'BARCODE', // 超商條碼
  ApplePay: 'ApplePay', // Apple Pay(僅支援手機支付)
  TWQR: 'TWQR', // 歐付寶TWQR行動支付(需申請開通)
  BNPL: 'BNPL', // 裕富無卡分期(需申請開通)
} as const

export const PaymentType = z.nativeEnum(PaymentMethods)

export interface PaymentOrder {
  // 交易金額
  TotalAmount: string
  // 交易描述
  TradeDesc: string
  // 商品名稱
  // - 如果商品名稱有多筆，需在金流選擇頁一行一行顯示商品名稱的話，商品名稱請以符號#分隔。
  // - 商品名稱字數限制為中英數400字內，超過此限制系統將自動截斷。 詳細的使用注意事項請參考FAQ。
  ItemName: string
  // 選擇預設付款方式 (必填)
  ChoosePayment: z.infer<typeof PaymentType>
}

function DotNETURLEncode(input: string): string {
  const list: { [key: string]: string } = {
    '%2D': '-',
    '%5F': '_',
    '%2E': '.',
    '%21': '!',
    '%2A': '*',
    '%28': '(',
    '%29': ')',
    '%20': '+',
  }

  Object.entries(list).forEach(([encoded, decoded]) => {
    const regex = new RegExp(encoded, 'g')
    input = input.replace(regex, decoded)
  })

  return input
}

function ecpayCheckMacValue(parameters: Record<string, string>, HashKey: string, HashIV: string): string {
  const Step0 = Object.entries(parameters)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  // (1) 將傳遞參數依照第一個英文字母，由A到Z的順序來排序(遇到第一個英文字母相同時，以第二個英文字母來比較，以此類推)，並且以&方式將所有參數串連。
  const Step1 = Step0.split('&')
    .sort((a, b) => {
      const keyA = a.split('=')[0]
      const keyB = b.split('=')[0]
      return keyA.localeCompare(keyB)
    })
    .join('&')

  // (2) 參數最前面加上HashKey、最後面加上HashIV
  const Step2 = `HashKey=${HashKey}&${Step1}&HashIV=${HashIV}`

  // (3) 將整串字串進行URL encode
  const Step3 = DotNETURLEncode(encodeURIComponent(Step2))

  // (4) 轉為小寫
  const Step4 = Step3.toLowerCase()

  // (5) 以SHA256加密方式來產生雜凑值
  const Step5 = crypto.createHash('sha256').update(Step4).digest('hex')

  // (6) 再轉大寫產生CheckMacValue
  const Step6 = Step5.toUpperCase()

  return Step6
}

// 特店訂單編號 (必填)
// - 特店訂單編號均為唯一值，不可重複使用。
// - 英數字大小寫混合
function getMerchantTradeNo(prefix = ''): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  const randomNum = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')

  return `${prefix}${year}${month}${day}${hours}${minutes}${seconds}${randomNum}`
}

// 特店交易時間
function getMerchantTradeDate(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`
}

const APIURL = `https://payment${+process.env.ECPAY_STAGE! ? '-stage' : ''}.ecpay.com.tw/Cashier/AioCheckOut/V5`

// 付款完成通知回傳網址
// - ReturnURL為付款結果通知回傳網址，為特店server或主機的URL，用來接收綠界後端回傳的付款結果通知。
// - 當消費者付款完成後，綠界會將付款結果參數以幕後回傳到該網址。詳細說明請參考付款結果通知
// - 請勿設定與Client端接收付款結果網址OrderResultURL相同位置，避免程式判斷錯誤。
// - ReturnURL收到綠界後端回傳的付款結果通知後，請回應字串1|OK給綠界。
// - 1|OK僅是廠商回應綠界是否收到通知，並不會改變付款狀態
// - 參數內容若有包含%26(&)及%3C(<) 這二個值時，請先進行urldecode() 避免呼叫API失敗。
const ReturnURL = `${site_rul}/api/payment/receive`

// Client端返回特店的按鈕連結
// - 消費者點選此按鈕後，會將頁面導回到此設定的網址
// - 導回時不會帶付款結果到此網址，只是將頁面導回而已。
// - 設定此參數，綠界會在付款完成或取號完成頁面上顯示[返回商店]的按鈕。
// - 設定此參數，發生簡訊OTP驗證失敗時，頁面上會顯示[返回商店]的按鈕。
// - 若未設定此參數，則綠界付款完成頁或取號完成頁面，不會顯示[返回商店]的按鈕。
// - 若導回網址未使用https時，部份瀏覽器可能會出現警告訊息。
// - 參數內容若有包含%26(&)及%3C(<) 這二個值時，請先進行urldecode() 避免呼叫API失敗。
const ClientBackURL = `${site_rul}`

// Client端回傳付款結果網址
// 有別於ReturnURL (server端的網址)，OrderResultURL為特店的client端(前端)網址。
// 消費者付款完成後，綠界會將付款結果參數以POST方式回傳到到該網址。詳細說明請參考付款結果通知。
// 若與[ClientBackURL]同時設定，將會以此參數為主。
// 銀聯卡及非即時交易( ATM、CVS、BARCODE )不支援此參數。
// 付款結果通知請依ReturnURL (server端的網址)為主,避免因前端操作或網路問題未收到OrderResultURL 特店的client端(前端)的通知。
// 參數內容若有包含%26(&)及%3C(<) 這二個值時，請先進行urldecode() 避免呼叫API失敗。
const OrderResultURL = `${site_rul}/checkout/result`

export interface IPaymentRequest {
  ApiUrl: string
  AllParams: Record<string, any>
}

// 付款
export function createPaymentRequest(MerchantTradeNo: string, order_page_id: string, course_event_id: number, paymentOrder: PaymentOrder): IPaymentRequest {
  // 一般信用卡測試卡號 : 4311-9522-2222-2222
  // 安全碼 : 222

  // 特店編號 (必填)
  const MerchantID = process.env.ECPAY_MERCHANT_ID!
  // 串接加密金鑰
  const HashKey = process.env.ECPAY_HASH_KEY!
  const HashIV = process.env.ECPAY_HASH_IV!

  const ParamsBeforeCMV = {
    // 特店編號
    MerchantID,
    // 特店訂單編號
    MerchantTradeNo,
    // 特店交易時間
    MerchantTradeDate: getMerchantTradeDate(),

    // 交易類型 請固定填入 aio
    PaymentType: 'aio',

    // CheckMacValue加密類型
    // - 請固定填入1，使用SHA256加密。
    EncryptType: '1',

    TotalAmount: paymentOrder.TotalAmount,
    TradeDesc: '課程',
    ItemName: paymentOrder.ItemName,
    ChoosePayment: paymentOrder.ChoosePayment,

    // 隱藏付款方式
    // 當付款方式[ChoosePayment]為ALL時，可隱藏不需要的付款方式，多筆請以井號分隔 (#)。
    // 綠界付款方式會不斷增加及調整，為避免因新付款方式造成接收付款結果通知失敗，
    // 建議串接時付款方式[ChoosePayment]固定指定付款方式。
    // IgnorePayment : '',

    // 是否需要額外的付款資訊 N/Y
    // 若要回傳額外的付款資訊時，參數值請傳：Ｙ，付款完成後綠界後端會以POST方式回傳額外付款資訊到特店的ReturnURL 與OrderResultURL。
    NeedExtraPaidInfo: 'N',

    // 商品銷售網址
    // ItemURLString: 'https://www.yourdomain.com/item',

    // 備註欄位
    // Remark: '',
    // 付款子項目
    // - 若設定此參數，建立訂單將轉導至綠界訂單成立頁，依設定的付款方式及付款子項目帶入訂單，無法選擇其他付款子項目。請參考付款方式一覽表
    // ChooseSubPayment: '',

    ReturnURL: `${ReturnURL}/${order_page_id}`,
    ClientBackURL: `${ClientBackURL}/checkout/${course_event_id}`,
    OrderResultURL: `${OrderResultURL}/${MerchantTradeNo}`,
  }

  // 檢查碼
  const CheckMacValue = ecpayCheckMacValue(ParamsBeforeCMV, HashKey, HashIV)

  return {
    ApiUrl: APIURL,
    AllParams: { ...ParamsBeforeCMV, CheckMacValue },
  }
}

export async function processOrder(order: OrderParamsSchemaType): Promise<{ rc: number; rm?: string; data?: IPaymentRequest }> {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const courseEvent = await getCourseEventByIdAsync(notion, order.courseEventId, false)
  if (!courseEvent || !courseEvent.課程資訊_名稱 || !courseEvent.教室資訊) {
    return { rc: 404, rm: 'Not Found' }
  }
  // 已截止報名
  if (!courseEvent.上課日期 || new Date(courseEvent.上課日期[0]) < new Date()) {
    return { rc: 422, rm: '已截止報名' }
  }

  const paymentOrder: PaymentOrder = {
    TotalAmount: (courseEvent.指定價格 || courseEvent.課程資訊_價格!).toString(),
    ItemName: courseEvent.課程資訊_名稱!,
    TradeDesc: `上課地點: ${courseEvent.教室資訊.地址}，上課時間：${courseEvent.上課日期[0]} ${courseEvent.上課日期[1]}`,
    ChoosePayment: PaymentType.enum.ALL,
  }

  const MerchantTradeNo = getMerchantTradeNo()
  const memberId = await getMemberIdAsync(notion, order)
  const page = await notion.pages.create({
    parent: { database_id: process.env.NOTION_DATABASE_ID_ORDERS! },
    properties: {
      訂單編號: { type: 'title', title: [{ type: 'text', text: { content: MerchantTradeNo } }] },
      會員: { type: 'relation', relation: [{ id: memberId }] },
      課程安排: { type: 'relation', relation: [{ id: courseEvent.PAGE_ID! }] },
      付款金額: { type: 'number', number: +paymentOrder.TotalAmount },
    },
  })
  if (!page) {
    return { rc: 500, rm: 'Internal Server Error' }
  }

  const paymentRequest = createPaymentRequest(MerchantTradeNo, page.id, order.courseEventId, paymentOrder)

  console.log(paymentRequest)
  return { rc: 200, data: paymentRequest }
}
