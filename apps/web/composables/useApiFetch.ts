import type { FetchError } from 'ofetch'
import { useFetch } from '#app'
import { ref, type UnwrapRef } from 'vue'
import { toast } from 'vue3-toastify'
import type { ApiResponse } from '~/server/utils/apiResponse'

export async function useApiFetch<T>(url: string, options: any = {}) {
  const data = ref<T | null>(null)
  const rc = ref<ResponseMessage | null>(null)
  const error = ref<unknown | null>(null)

  try {
    const { data: resData, error: resError } = await useFetch<ApiResponse<T>, FetchError<ApiResponse>>(url, options)
    if (resError.value) {
      data.value = resError.value.data?.data
      error.value = resError.value
      rc.value = resError.value.data?.rc || resError.value.statusCode!

      if (import.meta.client) {
        if (resError.value.data?.rm) {
          toast.warn(resError.value.data.rm)
        }
        else {
          toast.warn('系統忙碌中，請稍後再試。')
        }
      }
    }
    else if (resData.value && resData.value.data) {
      rc.value = resData.value.rc
      data.value = resData.value.data as UnwrapRef<T>
    }
  }
  catch (err: unknown) {
    rc.value = 500
    error.value = err
    if (import.meta.client) {
      toast.error(`系統忙碌中，請稍後再試。\n${JSON.stringify(err)}`)
    }
  }

  return { data, error, rc }
}
