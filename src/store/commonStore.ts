import {ref, computed, reactive} from 'vue'
import { defineStore } from 'pinia'
import type {IApiError} from "@/store/storeTypes";

export const useCommonStore = defineStore('commonStore', () => {
  let apiError: IApiError = reactive({code: '', message: ''})
  const GET_API_ERROR = computed(() => apiError)
  function SET_API_ERROR(error: IApiError): void {
    apiError.code = error.code
    apiError.message = error.message
  }

  return { GET_API_ERROR, SET_API_ERROR}
})


