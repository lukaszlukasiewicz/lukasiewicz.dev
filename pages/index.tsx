import { NextPage } from 'next'
import Head from 'next/head'
import Header from 'components/Header/Header'
import AnimatedHeader from 'components/AnimatedHeader/AnimatedHeader'
import usePageConfig from 'hooks/usePageConfig'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import TransitionCover from 'components/TransitionCover/TransitionCover'
import { FaGithub, FaRegKissWinkHeart } from "react-icons/fa"
import BodyClass from 'components/BodyClass/BodyClass'
import useI18nContent from 'hooks/useI18nContent'
import Link from 'next/link'

const localeContent = {
  en: {
    title: "Hello :)",
    headerText: <>World! Here you can <Link href="/about" data-cursor="link;var(--page-color);var(--page-background-color)"><span>get to know me</span></Link> a little or <Link href="/contact" data-cursor="mail;var(--page-color);var(--page-background-color)"><span>contact me</span></Link> if you want. You can also checkout the source code of this page on <a href="https://github.com/lukaszlukasiewicz/lukasiewicz.dev" data-cursor="GitHub;var(--page-color);var(--page-background-color)"><span>Github</span></a>. Issue reports and pull requests are welcome, just be nice <FaRegKissWinkHeart /></>,
  },
  pl: {
    title: "Hello :)",
    headerText: <>World! Tutaj możesz <Link href="/about" data-cursor="link"><span>poznać mnie trochę</span></Link> bliżej lub <Link href="/contact"><span>skontaktować się ze mną</span></Link> jeśli masz potrzebę. Możesz także sprawdzić kod źródłowy tej strony na <a href="https://github.com/lukaszlukasiewicz/lukasiewicz.dev"><span>Githubie <FaGithub /></span></a>. Zgłoszenia błędów i pull requesty są mile widziane tylko bądź miły(a) <FaRegKissWinkHeart />.</>,
  }
}

const Home: NextPage = () => {
  const { locale } = useRouter()
  const page = usePageConfig("home")
  const { backgroundColor, color } = page
  const { title, headerText } = useI18nContent(localeContent)
  return (
    <>
      <BodyClass className={`home-page home-page-${locale}`} />
      <TransitionCover >
        <Head>
          <title>Lukasiewicz.dev</title>
          <style>
            {`:root {
              --page-color: ${page.color};
              --page-background-color: ${page.backgroundColor};
              --page-primary-color: ${page.primaryColor};
            }`}
          </style>
        </Head>
        <Header style={{
          backgroundColor,
          color,
          minHeight: "100vh"
        }}>
          <div data-cursor="wave;var(--page-color);var(--page-background-color)">
            <AnimatedHeader initial="hidden" key={locale + "title"} level={1} animate="visible" split="letter">{title}</AnimatedHeader>
          </div>
          <motion.div key={locale + "headerText"} initial={{ y: "-4em", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "8em", opacity: 0 }} transition={{ type: "spring", delay: .3 }}>
            <p>{headerText}</p>
          </motion.div>
        </Header>
      </TransitionCover>
    </>
  )
}

export default Home
