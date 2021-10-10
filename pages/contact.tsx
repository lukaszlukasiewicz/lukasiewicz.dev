import type { NextPage } from 'next'
import Head from 'next/head'
import Header, { SubHeader } from 'components/Header/Header'
import { useRouter } from 'next/router'
import usePageConfig from 'hooks/usePageConfig'
import AnimatedHeader from 'components/AnimatedHeader/AnimatedHeader'
import { motion } from 'framer-motion'
import ScrollArrow from 'components/UI/ScrollArrow'
import TransitionCover from 'components/TransitionCover/TransitionCover'
import BodyClass from 'components/BodyClass/BodyClass'

const localeContent = {
  "en": {
    title: "Let's talk",
    headerText: "Vivamus nec erat mollis, faucibus nisl tincidunt, mattis tortor. Ut et imperdiet quam, sed tempus ipsum. Nam euismod eros ut feugiat congue."
  },
  "pl": {
    title: "Napisz do mnie",
    headerText: "In augue turpis, ultrices in leo sed, hendrerit hendrerit urna. Ut pretium dapibus lectus, quis euismod purus mattis eu. Sed fermentum laoreet facilisis."
  }
}

const Contact: NextPage = () => {
  const { locale } = useRouter();
  const page = usePageConfig("contact");
  const { backgroundColor, color } = page
  const currentLocale: (keyof typeof localeContent) = (locale ?? "en") as keyof typeof localeContent
  const { title, headerText } = localeContent[currentLocale]
  return (
    <>

      <BodyClass className={`contact-page contact-page-${locale}`} />
      <TransitionCover>
        <Head>
          <title>Contact page</title>
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
          color
        }}>
          <AnimatedHeader initial="hidden" animate="visible" split="letter">{title}</AnimatedHeader>
          <motion.div key={locale} initial={{ y: "-4em", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "8em", opacity: 0 }} transition={{ duration: 1, ease: "backOut" }}>
            <SubHeader pageId="contact">{headerText}</SubHeader>
          </motion.div>
          <ScrollArrow />
        </Header>
      </TransitionCover>
    </>

  )
}

export default Contact