import type { NextPage } from 'next'
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

const localeContent = {
  en: {
    title: "Hello :)",
    headerText: <>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus <FaGithub /> test ipsam delectus nobis soluta officia reprehenderit ducimus praesentium nesciunt rerum at est omnis, itaque velit libero optio amet vitae iure eligendi.<FaRegKissWinkHeart /></>,
  },
  pl: {
    title: "Cześć :)",
    headerText: <>[pl]Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus <FaGithub /> test ipsam delectus nobis soluta officia reprehenderit ducimus praesentium nesciunt rerum at est omnis, itaque velit libero optio amet vitae iure eligendi.<FaRegKissWinkHeart /></>,

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
