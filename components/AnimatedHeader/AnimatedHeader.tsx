import React from 'react'
import { motion } from 'framer-motion'
import Styles from './AnimatedHeader.module.scss'
import { useRouter } from 'next/router';

type AnimatedHeaderProps = {
  children: string,
  split?: "letter" | "word",
  initial?: string,
  animate?: string
}



const variants = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: ".6em", opacity: 0 }
}

type animateProps = {
  initial: string | undefined,
  animate: string | undefined,
  index: number
}

const animateProps = (initial: string | undefined, animate: string | undefined, index: number) => {
  return {
    variants: variants,
    initial: initial,
    animate: animate,
    transition: {
      duration: .7,
      ease: "backOut",
      delay: index * .05
    },
  }
}
const AnimatedHeader = ({ children, split = "word", initial, animate }: AnimatedHeaderProps) => {
  const { locale } = useRouter()
  const words = children.trim().split(" ")
  let letterIndex = 0;
  return <h1 className={Styles.AnimatedHeader}>
    {words.map((word, index) => {
      return <React.Fragment key={word + index}><span className={split == "word" ? Styles.AnimatedSpan : ""} >
        <motion.span {...(split == "word" ? animateProps(initial, animate, index) : {})}>
          {split == "word" ? word : word.split("").map((letter) => {
            letterIndex++
            return <span className={split == "letter" ? Styles.AnimatedSpan : ""} key={word + letter + letterIndex}>
              <motion.span {...animateProps(initial, animate, letterIndex)}>
                {letter}
              </motion.span>
            </span>
          })}
        </motion.span>
      </span>{" "}
      </React.Fragment>
    })}
  </h1>

  return <h1 className={Styles.AnimatedHeader} >
    {words.map((word, index) => {
      if (word == " ") return <React.Fragment key={(locale as string) + index}> {word} </React.Fragment>
      return <React.Fragment key={(locale as string) + index}>
        <span>
          <motion.span transition={{ duration: .7, ease: "backOut", delay: index * .05 }}>
            {word}
          </motion.span>
        </span>
        {split == "word" && " "}
      </React.Fragment>
    })}
  </h1 >
}

export default AnimatedHeader