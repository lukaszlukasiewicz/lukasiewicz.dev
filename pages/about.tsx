import type { NextPage } from 'next'
import Head from 'next/head'
import Header, { SubHeader } from 'components/Header/Header'
import { useRouter } from 'next/router';
import usePageConfig from 'hooks/usePageConfig';
import AnimatedHeader from 'components/AnimatedHeader/AnimatedHeader';
import { motion } from 'framer-motion';
import { BsArrowDown } from 'react-icons/bs'
import Section from 'components/UI/Section';
import { NegativeButton } from 'components/UI/Button';
import TransitionCover from 'components/TransitionCover/TransitionCover';
import { useEffect } from 'react';

const localeContent = {
  "en": {
    title: "Get to know me",
  },
  "pl": {
    title: "Poznajmy się bliżej",
  }
}

const paragraphVariants = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: "3em", opacity: 0 }
}

const ButtonVariants = {
  visible: { x: 0, opacity: 1 },
  hidden: { x: "3em", opacity: 0 }
}

const About: NextPage = () => {
  const router = useRouter()
  const { locale } = router;
  const page = usePageConfig("about");
  const currentLocale: (keyof typeof localeContent) = (locale ?? "en") as keyof typeof localeContent
  const { title } = localeContent[currentLocale]
  console.log(router);

  return (
    <>
      <TransitionCover>
        <Head>
          <title>About page</title>
          <style>
            {`:root {
              --page-color: ${page.color};
              --page-background-color: ${page.backgroundColor};
              --page-primary-color: ${page.primaryColor};
            }`}
          </style>
        </Head>
        <Header key="heder_about" style={{
          backgroundColor: page.backgroundColor,
          color: page.color
        }}>
          <AnimatedHeader initial="hidden" animate="visible" split="letter">{title}</AnimatedHeader>
          <motion.div key={locale + "p"} initial={{ y: "-4em", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "8em", opacity: 0 }} transition={{ type: "spring", delay: .3 }}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam delectus nobis soluta officia reprehenderit ducimus praesentium nesciunt rerum at est omnis, itaque velit libero optio amet vitae iure eligendi.</p>
          </motion.div>
          <motion.div style={{ fontSize: "2em", position: 'absolute', bottom: "2em", left: "50%" }} initial={{ y: "-2em", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "2em" }} transition={{ duration: 1, ease: "backOut", delay: .5 }}>
            <BsArrowDown />
          </motion.div>
        </Header>
        <Section>
          <div>
            <AnimatedHeader>Conse ctetur adipis cing elit ads asdasd </AnimatedHeader>
            <motion.p variants={paragraphVariants} transition={{ type: "spring", delay: .3 }}>
              Lorem ipsum dolor sit amet. Vero sed molestiae, necessitatibus expedita consectetur enim est, amet dignissimos aperiam accusantium illo quasi ea minima rem, nulla eligendi nobis id maxime.
            </motion.p>
            <motion.div variants={ButtonVariants} transition={{ type: "spring", delay: .6 }} style={{ marginTop: '2em' }}>
              <NegativeButton buttonSize="medium">Test</NegativeButton>
            </motion.div>
          </div>
          <div>
            Test
          </div>
        </Section>
      </TransitionCover>
    </>

  )
}

export default About