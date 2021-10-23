import type { NextPage } from 'next'
import Head from 'next/head'
import Header, { SubHeader } from 'components/Header/Header'
import { useRouter } from 'next/router';
import usePageConfig from 'hooks/usePageConfig';
import AnimatedHeader from 'components/AnimatedHeader/AnimatedHeader';
import { motion } from 'framer-motion';
import Footer from 'components/Footer/Footer';
import TransitionCover from 'components/TransitionCover/TransitionCover';
import BodyClass from "components/BodyClass/BodyClass"
import ScrollArrow from 'components/UI/ScrollArrow';
import SocialMedia from 'components/SocialMedia/SocialMedia';
import Section from 'components/UI/Section';
import Styles from './about.module.scss'
import SpotifyTracks from 'components/SpotifyTracks/SpotifyTracks';
import PocketArticles from 'components/PocketArticles/PocketArticles';
import Skils from 'components/Skills/Skills';
import AnimateInView from 'components/AnimateInView/AnimateInView';
import Projects from 'components/Projects/Projects';
import useI18nContent from 'hooks/useI18nContent';

const localeContent = {
  "en": {
    title: "A little bit about me",
    headerText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam delectus nobis soluta officia reprehenderit ducimus praesentium.",
    aboutHeader: "Ullam, commodi eveniet atque hic in non delectus!",
    aboutText: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores voluptas inventore dolorem quasi fugiat beatae quos fugit temporibus, amet porro voluptates tempore eligendi, dolorum culpa maiores, minus pariatur deserunt ab maxime voluptatibus quisquam! Adipisci, porro amet est odio laboriosam doloremque eveniet illo delectus atque vel rem nihil maiores debitis repellat odit, rerum praesentium omnis cum quidem aspernatur nobis.",
    work: "Work",
    workHeader: "What I do",
    afterWork: "After work",
    reading: "Reading",
    listening: "Listening"
  },

  "pl": {
    title: "Poznajmy się trochę bliżej",
    headerText: "[pl]Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus ipsam delectus nobis soluta officia reprehenderit ducimus praesentium.",
    aboutHeader: "[pl]Ullam, commodi eveniet atque hic in non delectus!",
    aboutText: "[pl]Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores voluptas inventore dolorem quasi fugiat beatae quos fugit temporibus, amet porro voluptates tempore eligendi, dolorum culpa maiores, minus pariatur deserunt ab maxime voluptatibus quisquam! Adipisci, porro amet est odio laboriosam doloremque eveniet illo delectus atque vel rem nihil maiores debitis repellat odit, rerum praesentium omnis cum quidem aspernatur nobis.",
    work: "Praca",
    workHeader: "Czym sie zajmuje",
    afterWork: "Po pracy",
    reading: "Czytam",
    listening: "Słucham"
  }
}

const paragraphVariants = (visible = {}, hidden = {}) => {
  return {
    visible: Object.assign({ y: 0, opacity: 1, transition: { delay: .5, type: "spring" } }, visible),
    hidden: Object.assign({ y: "4em", opacity: 0 }, hidden)
  }
}

const About: NextPage = () => {
  const router = useRouter()
  const { locale } = router;
  const page = usePageConfig("about");
  const { title, headerText, aboutHeader, aboutText, work, workHeader, afterWork, reading, listening } = useI18nContent(localeContent)
  return (
    <>
      <BodyClass className={`about-page about-page-${locale}`} />
      <TransitionCover>
        <Head>
          <title>{title}</title>
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
        }}><div data-cursor="scroll;var(--page-color);#fff">
            <AnimatedHeader initial="hidden" level={1} animate="visible" split="letter">{title}</AnimatedHeader>
            <motion.div key={locale + "p"} initial={{ y: "-4em", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "8em", opacity: 0 }} transition={{ type: "spring", delay: 1 }}>
              <p>{headerText}</p>
            </motion.div>
            <ScrollArrow />
          </div>
        </Header>
        <Section className={Styles.AboutSection} containerClassName={Styles.AboutSection__Container}>
          <div>
            <AnimatedHeader level={2}>
              {aboutHeader}
            </AnimatedHeader>
            <motion.p variants={paragraphVariants()}>
              {aboutText}
            </motion.p>
          </div>
        </Section>
        <div data-cursor="default;#fff" className={Styles.WorkSection}>
          <Section>
            <h2 style={{ zIndex: 2, position: "sticky", top: "2rem", fontSize: "2rem", color: "#ddd", textTransform: "uppercase", margin: "2rem .5em 0 .5vw", width: "fit-content" }}>{work}</h2>
            <AnimatedHeader level={3} split="letter">{workHeader}</AnimatedHeader>
            <Skils />
          </Section>
        </div>
        <Section className={Styles.ProjectsSection} containerClassName={Styles.ProjectsSection__wrapper}>
          <Projects />
        </Section>
        <Section className={Styles.AfterWorkSection}>
          <h2 style={{ zIndex: 2, position: "sticky", top: "2rem", fontSize: "2rem", color: "#ddd", textTransform: "uppercase", margin: "2rem .5em 0 1vw", width: "fit-content" }}>{afterWork}</h2>
          <div>
            <AnimatedHeader split="letter" level={3} className={Styles.AfterWorkSection__ReadingHeader}>{reading}</AnimatedHeader>
            <PocketArticles />
          </div>
          <AnimateInView>
            <AnimatedHeader split="letter" level={3} className={Styles.AfterWorkSection__ListeningHeader}>{listening}</AnimatedHeader>
            <SpotifyTracks />
          </AnimateInView>
        </Section>
        <div data-cursor="default;#fff">
          <SocialMedia />
          <Footer />
        </div>
      </TransitionCover>
    </>
  )
}

export default About