import { pathToRegexp } from 'path-to-regexp'
import config from '../config'
import $ from 'jquery'
import { createIntl, createIntlCache } from 'react-intl'
import * as translate from 'locale'

export const defaultLanguage = config.i18n ? config.i18n.defaultLanguage : 'en'

export function isMatch(pathname: string, regepx: any) {
  return regepx instanceof RegExp ? regepx.test(pathname) : pathToRegexp(regepx).exec(pathname)
}

export function downloadURI(uri: string, name: string) {
  let link: HTMLAnchorElement | null = document.createElement('a')

  link.download = name
  link.href = uri

  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  link = null
}

export function copyToClipboard(item: string | null | undefined, onSuccess?: () => void, onFail?: () => void) {
  if (!item || !window || !window.navigator) {
    return
  }

  if (window.navigator.permissions) {
    const permissionName = 'clipboard-write' as PermissionName
    window.navigator.permissions
      .query({ name: permissionName })
      .then((result) => {
        if (result.state === 'granted' || result.state === 'prompt') {
          writeClipboard(item, onSuccess, onFail)
        }
      })
      .catch((err) => {
        writeClipboard(item, onSuccess, onFail)
      })
  } else if (window.navigator.clipboard) {
    writeClipboard(item, onSuccess, onFail)
  } else {
    // Fix issue safari doens't support Clipboard API
    const clipBoardElem = document.createElement('input')
    document.body.appendChild(clipBoardElem)
    clipBoardElem.value = item
    clipBoardElem.select()

    try {  
      const successful = document.execCommand('copy')
      if (!successful) {
        throw 'error'
      }
      onSuccess && onSuccess()
    } catch(err) {
      onFail && onFail()
    }
    document.body.removeChild(clipBoardElem)
  }
}

function writeClipboard(item: string, onSuccess?: () => void, onFail?: () => void) {
  window.navigator.clipboard.writeText(item)
    .then(
      () => {
        onSuccess && onSuccess()
      },
      () => {
        onFail && onFail()
      }
    )
}

export function isPublicPage(url: string | undefined) {
  if (!url) {
    return true
  }
  return config.publicPages.filter((item) => isMatch(url, item)).length > 0
}

export function getFullUrl(path: string) {
  if (!window || !window.location) {
    return path
  }
  return window.location.origin + path
}

export function showPreloader() {
  if ($('#preloader').length) {
    $('#preloader').show()
  }
}

export function hidePreloader() {
  if ($('#preloader').length) {
    $('#preloader').fadeOut('slow', function() {
      $(this).hide()
    })
  }
}

let intl: any
let cache = createIntlCache()
export function refreshLanguage(language: string) {
  intl = createIntl(
    {
      locale: language,
      messages: translate.languages[language]
    },
    cache
  )
}

export function trans(id: string, values?: Record<string, any>) {
  if (!intl) {
    return id
  }
  return intl.formatMessage({ id }, values)
}

export async function sleep(miliseconds: number) {
  await new Promise(f => setTimeout(f, miliseconds));
}
