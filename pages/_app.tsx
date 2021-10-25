import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Menu from 'components/Menu/Menu'
import { AnimatePresence } from 'framer-motion'
import Cursor from 'components/Cursor/Cursor'
import LockOut from 'components/LockOut/LockOut'

function MyApp({ Component, pageProps, router }: AppProps) {
  return <LockOut>
    <Cursor />
    <Menu />
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  </LockOut>
}
export default MyApp
