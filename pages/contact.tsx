import { NextPage } from 'next'
import Head from 'next/head'
import Header from 'components/Header/Header'
import { useRouter } from 'next/router'
import usePageConfig from 'hooks/usePageConfig'
import AnimatedHeader from 'components/AnimatedHeader/AnimatedHeader'
import { motion } from 'framer-motion'
import ScrollArrow from 'components/UI/ScrollArrow'
import TransitionCover from 'components/TransitionCover/TransitionCover'
import BodyClass from 'components/BodyClass/BodyClass'
import Footer from 'components/Footer/Footer'
import SocialMedia from 'components/SocialMedia/SocialMedia'
import Section from 'components/UI/Section'
import ContactForm from 'components/ContactForm/ContactForm'
import useI18nContent from 'hooks/useI18nContent'

const localeContent = {
  "en": {
    title: "Let's talk about things",
    headerText: "Feel free to reach out if got a question or project you want to work on, or if you just want to chat about something."
  },
  "pl": {
    title: "Pogadajmy o rzeczach",
    headerText: "Nie krępuj się, jeśli masz jakieś pytanie, projekt nad którym chcesz pracować, lub jeśli chcesz po prostu o czymś porozmawiać. Zapraszam do kontaktu."
  }
}

const Contact: NextPage = () => {
  const { locale } = useRouter();
  const page = usePageConfig("contact");
  const { backgroundColor, color } = page
  const { title, headerText } = useI18nContent(localeContent)
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
          <div data-cursor="scroll;var(--page-color);#fff">
            <AnimatedHeader initial="hidden" level={1} animate="visible" split="letter">{title}</AnimatedHeader>
            <motion.div key={locale} initial={{ y: "-4em", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "8em", opacity: 0 }} transition={{ duration: 1, ease: "backOut", delay: 1 }}>
              <p>{headerText}</p>
            </motion.div>
            <ScrollArrow />
          </div>
        </Header>
        <Section>
          <ContactForm />
        </Section>
        <div data-cursor="default;#fff">
          <SocialMedia />
          <Footer />
        </div>
      </TransitionCover>
    </>

  )
}

export default Contact