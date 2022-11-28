import { useEffect } from 'react'
import { hidePreloader } from 'utils'

function usePreloader() {
  useEffect(() => {
    hidePreloader()
  }, [])
}

export default usePreloader