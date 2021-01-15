import '@/styles/global.css'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@/providers/themeProvider'
import { ImageOverlayProvider } from '@/providers/imageOverlayProvider'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import * as gtag from '../lib/gtag'

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        {/* https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-nee1ds */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </Head>
      <ImageOverlayProvider>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </ImageOverlayProvider>
    </>
  )
}

export default App
