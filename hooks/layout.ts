import enquire from 'enquire.js'
import { useEffect, useState } from 'react'

if (typeof window !== 'undefined') {
  // Fix: enquire relies on the matchMedia API. It utilises both matchMedia and matchMedia.addListener.
  // Unfortunately the matchMedia API isn't universally supported in browsers
  const matchMediaPolyfill = (mediaQuery: string) => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {},
      removeListener() {}
    }
  }
  window.matchMedia = window.matchMedia || matchMediaPolyfill
}

export const useMobileLayout = () => {
  const [isMobile, setIsMobile] = useState(false)
  const mobileQuery = 'only screen and (max-width: 767.99px)'

  useEffect(() => {
    const handler = {
      match: function () {
        setIsMobile(true)
      },
      unmatch: function () {
        setIsMobile(false)
      }
    }
    enquire.register(mobileQuery, handler)
    return () => {
      enquire.unregister(mobileQuery, handler)
    }
  })
  return isMobile
}

export const useQueryLayout = (query: string) => {
  const [isMatch, setIsMatch] = useState(false)

  useEffect(() => {
    const handler = {
      match: function () {
        setIsMatch(true)
      },
      unmatch: function () {
        setIsMatch(false)
      }
    }
    enquire.register(query, handler)
    return () => {
      enquire.unregister(query, handler)
    }
  }, [])

  return isMatch
}
