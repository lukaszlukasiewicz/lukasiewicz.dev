import { NextPage } from 'next'
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
import useI18nContent from 'hooks/useI18nContent';
import { MdOutlineWavingHand } from "react-icons/md"
import getPocketPosts from 'utils/getPocketPosts';
import getSpotifyTracks from 'utils/getSpotifyTracks';

const localeContent = {
  "en": {
    title: "A little bit about me",
    headerText: "",
    aboutHeader: "I design & build things using HTML, CSS & JavaScript",
    aboutText: <>I’m a Front-End Developer located in Szczecin, Poland. I started as a designer and transitioned in to front-end development. I&apos;m still passionate about design (especially when it comes to visual identity design) but for last 5 years my main focus is developement. I have worked on a multitude of web and print based projects for a range of clients providing Design (Photoshop, Illustrator, Figma) and Development (HTML, CSS, JS &amp; PHP) services. For almost a decade I designed &amp; developed projects with wonderfoul people &amp; clients at <a href="https://brandoo.pl/"><span>Brandoo <MdOutlineWavingHand /></span></a> Now I&apos;m looking for new challenges and I’m open to freelance opportunities or remote position. Feel free to reach out if you have an intresting Idea.</>,
    work: "Work",
    workHeader: "What I do",
    afterWork: "After work",
    reading: "Reading",
    listening: "Listening"
  },

  "pl": {
    title: "Poznajmy się trochę bliżej",
    headerText: "",
    aboutHeader: "Projektuję i tworzę rzeczy używając HTML, CSS i JavaScript.",
    aboutText: <>Jestem Front-End Developerem mieszkającym w Szczecinie, Polska. Zaczynałem jako projektant i przeszedłem do front-end developmentu. Nadal pasjonuję się projektowaniem (szczególnie jeśli chodzi o identyfikację wizualną), ale przez ostatnie 5 lat skupiam się głównie na programowaniu. Pracowałem nad wieloma projektami internetowymi i drukowanymi dla różnych klientów, świadcząc usługi projektowe (Photoshop, Illustrator, Figma) i programistyczne (HTML, CSS, JS i PHP). Przez prawie dekadę projektowałem i rozwijałem projekty z cudownymi ludźmi i klientami w <a href="https://brandoo.pl/"><span>Brandoo <MdOutlineWavingHand /></span></a>. Teraz szukam nowych wyzwań i jestem otwarty na freelance lub pracę zdalną. Zapraszam do kontaktu, jeśli masz ciekawy pomysł.</>,
    work: "Praca",
    workHeader: "Czym sie zajmuje",
    afterWork: "Po pracy",
    reading: "Czytam",
    listening: "Słucham"
  }
}

export function getServerSideProps() {
  const posketData = getPocketPosts() || []
  const spotifyData = getSpotifyTracks() || []
  return {
    props: {
      pocket: posketData,
      spotify: spotifyData,
    },
  }
}

const paragraphVariants = (visible = {}, hidden = {}) => {
  return {
    visible: Object.assign({ y: 0, opacity: 1, transition: { delay: .5, type: "spring" } }, visible),
    hidden: Object.assign({ y: "4em", opacity: 0 }, hidden)
  }
}

type AboutPageProps = { pocket: { upadated: number, posts: [] }, spotify: { updated: number, tracks: [] } }

const About: NextPage<AboutPageProps> = (props) => {
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
            <h2>{work}</h2>
            <AnimatedHeader level={3} split="letter">{workHeader}</AnimatedHeader>
            <Skils />
          </Section>
        </div>
        <Section className={Styles.AfterWorkSection}>
          <h2>{afterWork}</h2>
          <div>
            <AnimatedHeader split="letter" level={3} className={Styles.AfterWorkSection__ReadingHeader}>{reading}</AnimatedHeader>
            <PocketArticles articles={props.pocket.posts} />
          </div>
          <AnimateInView>
            <AnimatedHeader split="letter" level={3} className={Styles.AfterWorkSection__ListeningHeader}>{listening}</AnimatedHeader>
            <SpotifyTracks tracks={props.spotify.tracks} />
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