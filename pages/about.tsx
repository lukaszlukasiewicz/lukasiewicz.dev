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
  const { locale } = useRouter();
  const page = usePageConfig();
  const currentLocale: (keyof typeof localeContent) = (locale ?? "en") as keyof typeof localeContent
  const { title } = localeContent[currentLocale]

  return (
    <>
      <Head>
        <title>About page</title>
      </Head>
      <Header style={{
        backgroundColor: page.backgroundColor,
        color: page.color
      }}>
        <AnimatedHeader initial="hidden" animate="visible" split="letter">{title}</AnimatedHeader>
        <motion.div key={locale + "p"} initial={{ y: "-4em", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "4em" }} transition={{ type: "spring", delay: .3 }}>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam delectus nobis soluta officia reprehenderit ducimus praesentium nesciunt rerum at est omnis, itaque velit libero optio amet vitae iure eligendi.</p>
        </motion.div>
        <motion.div style={{ fontSize: "2em", position: 'absolute', bottom: "-.8em", left: "50%" }} initial={{ y: "-2em", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "2em" }} transition={{ duration: 1, ease: "backOut", delay: .5 }}>
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
    </>

  )
}

export default About