import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Menu from 'components/Menu/Menu'
import { AnimatePresence } from 'framer-motion'
import Cursor from 'components/Cursor/Cursor'

function MyApp({ Component, pageProps, router }: AppProps) {
  return <>
    <Cursor />
    <Menu />
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  </>
}
export default MyApp
