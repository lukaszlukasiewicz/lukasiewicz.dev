import type { NextPage } from 'next'
import Head from 'next/head'
import Header from 'components/Header/Header'
import AnimatedHeader from 'components/AnimatedHeader/AnimatedHeader'
import usePageConfig from 'hooks/usePageConfig'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import TransitionCover from 'components/TransitionCover/TransitionCover'

const Home: NextPage = () => {
  const { locale } = useRouter()
  const page = usePageConfig("home")
  const { backgroundColor, color } = page
  return (
    <>
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
          <AnimatedHeader initial="hidden" animate="visible" split="letter">Hi ;)</AnimatedHeader>
          <motion.div key={locale + "p"} initial={{ y: "-4em", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "8em", opacity: 0 }} transition={{ type: "spring", delay: .3 }}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam delectus nobis soluta officia reprehenderit ducimus praesentium nesciunt rerum at est omnis, itaque velit libero optio amet vitae iure eligendi.</p>
          </motion.div>
        </Header>
      </TransitionCover>
    </>

  )
}

export default Home
