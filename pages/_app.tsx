import '../styles/globals.scss'
import React from 'react'
import { AppProps } from 'next/app'
import Menu from 'components/Menu/Menu'
import { AnimatePresence } from 'framer-motion'
import Cursor from 'components/Cursor/Cursor'
import Router from "next/router";

const routeChange = () => {
  // Temporary fix to avoid flash of unstyled content
  // during route transitions. Keep an eye on this
  // issue and remove this code when resolved:
  // https://github.com/vercel/next.js/issues/17464
  const tempFix = () => {
    const allStyleElems = document.querySelectorAll('style[media="x"]');
    allStyleElems.forEach((elem) => {
      elem.removeAttribute("media");
    });
  };
  tempFix();
};

Router.events.on("routeChangeComplete", routeChange);
Router.events.on("routeChangeStart", routeChange);

function MyApp({ Component, pageProps, router }: AppProps) {

  return <>
    <Cursor />
    <Menu />
    <AnimatePresence mode="wait">
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  </>
}
export default MyApp
