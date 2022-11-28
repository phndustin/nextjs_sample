import Layout from 'components/layout'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { RootStore, RootStoreProvider, setupRootStore } from 'models'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css/animate.css'
import 'aos/dist/aos.css'
import 'styles/globals.scss'
import { IntlProvider } from 'react-intl'
import { languages } from 'locale'
import configs from '../config'
import { refreshLanguage } from 'utils'

let rootStoreInstance: RootStore

function App({ Component, pageProps }: AppProps) {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ; (async () => {
      setupRootStore().then(setRootStore)
    })()
  }, [])

  useEffect(() => {
    if (rootStore) {
      rootStoreInstance = rootStore
    }
  }, [rootStore])

  const language = rootStore?.userStore.user?.language || configs.i18n.defaultLanguage
  refreshLanguage(language)

  return (
    <RootStoreProvider value={rootStore}>
      <IntlProvider messages={languages[language]} locale={language}>
        <Layout>
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </Layout>
      </IntlProvider>
    </RootStoreProvider>
  )
}

export function getRootStoreInstance(): RootStore {
  return rootStoreInstance
}

export default App
