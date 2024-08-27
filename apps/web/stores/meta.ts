import type { MetaSchemaType } from '~/schema/meta'

export const useMetaStore = defineStore('meta', () => {
  const defaultMeta: Partial<MetaSchemaType> = {
    標題後墜: true, // 預設啟用後墜
    圖片: '/ogmeta-PCCA.jpg', // TODO: 設定檔
  }
  const config = useRuntimeConfig()
  const route = useRoute()

  const meta = useState<Partial<MetaSchemaType>>(() => defaultMeta)

  useSeoMeta({
    title: () => (meta.value.標題 || (route.name as string)) + (meta.value.標題後墜 ? ` | ${config.public.siteName}` : ''),
    description: () => meta.value.描述,
    ogImage: () => meta.value.圖片 || defaultMeta.圖片,
  })

  async function updateMeta(path: string, fullback: Partial<MetaSchemaType> | null = defaultMeta, options: any = {}) {
    const { data } = await useApiFetch<Partial<MetaSchemaType>>(`/api/meta${path}`, options)
    meta.value = data.value || {
      ...defaultMeta,
      ...fullback,
    }
  }

  return { meta, updateMeta }
})
