import React, { useRef } from "react"
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa"
import Styles from './SocialMedia.module.scss'
import AnimatedHeader from "components/AnimatedHeader/AnimatedHeader"
import Section from "components/UI/Section"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { BsArrowRight } from "react-icons/bs"
import Header from "components/Header/Header"
import useI18nContent from "hooks/useI18nContent"

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/lukaszlukasiewicz/",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/llukasiewicz/",
    icon: FaLinkedin,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/lukasz.lukasiewicz/",
    icon: FaFacebook
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
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis laudantium eveniet enim nisi natus maiores.",
  },
  pl: {
    header: "[pl]I'm on the web",
    text: "[pl]Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis laudantium eveniet enim nisi natus maiores.",
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
        return <div key={social.name}>
          <motion.a data-cursor="link;var(--page-background-color);var(--page-color)" href={social.url} className={Styles.SocialMedia__Icon} variants={getIconVariants(index)} >
            <span>{social.name}</span>
            <BsArrowRight />
          </motion.a>
        </div>
      })}
    </div>
  </Section>
}

export default SocialMedia