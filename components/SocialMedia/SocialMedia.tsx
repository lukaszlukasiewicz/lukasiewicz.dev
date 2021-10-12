import React, { useRef } from "react"
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa"
import usePageConfig from "hooks/usePageConfig"
import Styles from './SocialMedia.module.scss'
import AnimatedHeader from "components/AnimatedHeader/AnimatedHeader"
import Section from "components/UI/Section"
import { motion } from "framer-motion"
import { useRouter } from "next/router"

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
    url: "https://www.linkedin.com/in/llukasiewicz/",
    icon: FaFacebook
  },
]

const getIconVariants = (index: number) => {
  return {
    visible: { y: 0, opacity: 1, transition: { type: "spring", delay: 1 + index * .2 } },
    hidden: { y: "4em", opacity: 0 }
  }
}

const paragraphVariants = {
  visible: { y: 0, opacity: 1, transition: { type: "spring", delay: .5 } },
  hidden: { y: "2em", opacity: 0 }
}

const SocialMedia = () => {

  const { pathname } = useRouter();
  const currentPage = useRef(pathname.replace("/", ""))
  const page = usePageConfig(currentPage.current)
  return <Section className={Styles.SocialMedia}>
    <div>
      <AnimatedHeader level={2}>I&apos;m on the web</AnimatedHeader>
      <motion.p variants={paragraphVariants}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis laudantium eveniet enim nisi natus maiores.</motion.p>
      <div className={Styles.SocailMedia__wrapper}>
        {socials.map((social, index) => {
          const Icon = social.icon
          return <div key={social.name}>
            <motion.a href={social.url} variants={getIconVariants(index)}>
              <Icon color={page.color} className={Styles.SocialMedia__Icon} />
            </motion.a>
          </div>
        })}
      </div>
    </div>
  </Section>
}

export default SocialMedia