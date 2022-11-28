import Head from 'next/head'
import { ReactNode, useEffect } from 'react'
import Loading from 'components/loading'
import Aos from 'aos'

interface PropsType {
  children: ReactNode
}

function Layout(props: PropsType) {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true
    })
  }, [])

  return (
    <>
      <Head>
        <title>Home</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content="Web site created using create-react-app"/>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, user-scalable=no, user-scalable=0"/>
        <link href="/favicon.png" rel="icon"></link>
        {/* <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> */}
      
        {/* manifest.json provides metadata used when your web app is installed on a
        user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/ */}
      <link rel="manifest" href="/manifest.json" />
      </Head>

      <div>{props.children}</div>
      <Loading />
    </>
  )
}

export default Layout