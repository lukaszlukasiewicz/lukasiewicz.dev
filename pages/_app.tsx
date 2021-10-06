import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import usePageConfig from 'hooks/usePageConfig'
import Menu from 'components/Menu/Menu'

function MyApp({ Component, pageProps }: AppProps) {
  const page = usePageConfig();
  return <>
    <Head>
      <style>
        {`:root {
          --page-color: ${page.color};
          --page-background-color: ${page.backgroundColor};
          --page-primary-color: ${page.primaryColor};
        }`}
      </style>
    </Head>
    <Menu />
    <Component {...pageProps} />
  </>
}
export default MyApp
