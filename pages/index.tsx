import type { NextPage } from 'next'
import Head from 'next/head'
import Header from 'components/Header/Header'
import AnimatedHeader from 'components/AnimatedHeader/AnimatedHeader'
import usePageConfig from 'hooks/usePageConfig'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const Home: NextPage = () => {
  const { locale } = useRouter()
  const page = usePageConfig()
  return (
    <>
      <Head>
        <title>Lukasiewicz.dev</title>
      </Head>
      <Header style={{
        backgroundColor: page.backgroundColor,
        color: page.color, minHeight: "100vh"
      }}>
        <AnimatedHeader initial="hidden" animate="visible" split="letter">Hi ;)</AnimatedHeader>
        <motion.div key={locale + "p"} initial={{ y: "-4em", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "4em" }} transition={{ type: "spring", delay: .3 }}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam delectus nobis soluta officia reprehenderit ducimus praesentium nesciunt rerum at est omnis, itaque velit libero optio amet vitae iure eligendi.</p>
        </motion.div>
      </Header>
    </>

  )
}

export default Home
