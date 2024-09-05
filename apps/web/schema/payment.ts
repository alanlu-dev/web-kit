import { z } from 'zod'

const OrderPaymentMethod = {
  綠界: '綠界',
  現金: '現金',
  免費: '免費',
} as const

export const OrderPaymentMethodEnum = z.nativeEnum(OrderPaymentMethod)
export type OrderPaymentMethodEnumType = z.infer<typeof OrderPaymentMethodEnum>
