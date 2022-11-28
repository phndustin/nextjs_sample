import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { DEFAULT_API, ROOT_STATE_STORAGE_KEY } from 'utils/constants'
import * as storage from 'utils/storage'
import { hidePreloader, isMatch, isPublicPage, trans as t } from 'utils'
import { getRootStoreInstance } from 'pages/_app'
import message from 'components/message'

// Config ==========================================
const dontAttachAccessToken: Array<RegExp> = [/\/signin\/*/, /\/signup\/*/]

const ignoreErrorUrls = [
]
// =================================================

const api: AxiosInstance = axios.create({
  baseURL: DEFAULT_API,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

api.interceptors.request.use(onStartRequest, onEndRequest)
api.interceptors.response.use(onSuccess, onError)

// Interceptors ====================================
function onStartRequest(config: AxiosRequestConfig<any>) {
  // Attach access token in request
  if (!shouldAttachAccessToken(config.url)) {
    return config
  }

  const store = storage.load(ROOT_STATE_STORAGE_KEY)
  if (!store || !store.userStore || !store.userStore.accessToken) {
    return config
  }

  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${store.userStore.accessToken}`
  }
  return config
}

function onEndRequest(error: any) {
  return Promise.reject(error)
}

function onSuccess(response: AxiosResponse<any, any>) {
  return response
}

function onError(error: AxiosError) {
  hidePreloader()
  if (error.response) {
    if (!shouldHandleError(error.response.config.url)) {
      throw error
    }

    const status = error.response.status
    if (status === 401) {
      signOut()
      if (isPublicPage(window.location.pathname)) {
        // window.location.reload()
      } else {
        window.location.href = '/signin'
      }
    } else if (status === 404) {
      // NOTE: redirect to 404 page in component
    } else if (error.response.data.errors) {
      const errDetail = error.response.data.errors
      const errors = Object.keys(errDetail).map(function (k) {
        return errDetail[k][0]
      })
  
      message.error(t('Error!'), t(errors[0]))
    } else if (error.response.data.error) {
      const title = error.response.data.message || 'Error!'
      message.error(title, t(error.response.data.error))
    } else {
      message.error(t('Error!'), t('Something went wrong!'))
    }
  } else {
    message.error(t('Oops!'), t('Nework Unavailable!'))
  }
  throw error
}

function signOut() {
  const rootStore = getRootStoreInstance()
  if (rootStore) {
    rootStore.userStore.reset()
  }
  storage.clear()
}

function shouldAttachAccessToken(url: string | undefined) {
  if (!url) {
    return false
  }
  if (dontAttachAccessToken.length > 0 && dontAttachAccessToken.find((item) => isMatch(url, item))) {
    return false
  }
  return true
}

function shouldHandleError(url: string | undefined) {
  if (!url) {
    return false
  }
  if (ignoreErrorUrls.length > 0 && ignoreErrorUrls.find((item) => item === url)) {
    return false
  }
  return true
}

export default api
