import React, { useRef } from "react"
import Styles from './SocialMedia.module.scss'
import AnimatedHeader from "components/AnimatedHeader/AnimatedHeader"
import Section from "components/UI/Section"
import { motion } from "framer-motion"
import { BsArrowRight } from "react-icons/bs"
import useI18nContent from "hooks/useI18nContent"

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/lukaszlukasiewicz/",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/llukasiewicz/",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/lukasz.lukasiewicz/",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/lukaszlukasiewicz/"
  }
]

const getIconVariants = (index: number) => {
  return {
    visible: { x: 0, opacity: 1, transition: { type: "spring", delay: 1 + index * .2 } },
    hidden: { x: "1em", opacity: 0 }
  }
}

const paragraphVariants = {
  visible: { y: 0, opacity: 1, transition: { type: "spring", delay: .5 } },
  hidden: { y: "2em", opacity: 0 }
}

const localeContent = {
  en: {
    header: "I'm on the web",
    text: "I'm not very \"social media\" active person but if You prefer You can use these links to reach me. Just be patient ;)",
  },
  pl: {
    header: "Znajdź mnie w sieci",
    text: "Nie jestem zbyt aktywną osobą w mediach społecznościowych, ale jeśli wolisz, możesz skorzystać z tych linków, aby się ze mną skontaktować. Tylko proszę o odrobinę cierpliwości ;)",
  },
}

const SocialMedia = () => {

  const { header, text } = useI18nContent(localeContent)
  return <Section className={Styles.SocialMedia} containerClassName={Styles.SocialMedia__Container}>
    <div>
      <AnimatedHeader level={2}>{header}</AnimatedHeader>
      <motion.p variants={paragraphVariants}>{text}</motion.p>
    </div>
    <div className={Styles.SocailMedia__wrapper}>
      {socials.map((social, index) => {
        const cursor = `${social.name};var(--page-background-color);var(--page-color)`;
        //const cursor = "link"
        return <div key={social.name}>
          <motion.a data-cursor={cursor} href={social.url} className={Styles.SocialMedia__Icon} variants={getIconVariants(index)} >
            <span>{social.name}</span>
            <BsArrowRight />
          </motion.a>
        </div>
      })}
    </div>
  </Section>
}

export default SocialMedia