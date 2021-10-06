import type { NextPage } from 'next'
import Head from 'next/head'
import Header, { SubHeader } from 'components/Header/Header'
import { useRouter } from 'next/router'
import usePageConfig from 'hooks/usePageConfig'
import AnimatedHeader from 'components/AnimatedHeader/AnimatedHeader'
import { motion } from 'framer-motion'
import { BsArrowDown } from 'react-icons/bs'

const localeContent = {
  "en": {
    title: "Let's talk",
    headerText: "Vivamus nec erat mollis, faucibus nisl tincidunt, mattis tortor. Ut et imperdiet quam, sed tempus ipsum. Nam euismod eros ut feugiat congue."
  },
  "pl": {
    title: "Porozmawiajmy",
    headerText: "In augue turpis, ultrices in leo sed, hendrerit hendrerit urna. Ut pretium dapibus lectus, quis euismod purus mattis eu. Sed fermentum laoreet facilisis."
  }
}

const Contact: NextPage = () => {
  const { locale } = useRouter();
  const page = usePageConfig();
  const currentLocale: (keyof typeof localeContent) = (locale ?? "en") as keyof typeof localeContent
  const { title, headerText } = localeContent[currentLocale]
  return (
    <>
      <Head>
        <title>Contact page</title>
      </Head>
      <Header style={{
        backgroundColor: page.backgroundColor,
        color: page.color
      }}>
        <AnimatedHeader initial="hidden" animate="visible" split="letter">{title}</AnimatedHeader>
        <motion.div key={locale} initial={{ y: "-4em", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "4em" }} transition={{ duration: 1, ease: "backOut" }}>
          <SubHeader>{headerText}</SubHeader>
        </motion.div>

        <motion.div style={{ fontSize: "2em", position: 'absolute', bottom: "-.8em", left: "50%" }} initial={{ y: "-2em", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "2em" }} transition={{ duration: 1, ease: "backOut", delay: .5 }}>
          <BsArrowDown />
        </motion.div>
      </Header>
    </>

  )
}

export default Contact