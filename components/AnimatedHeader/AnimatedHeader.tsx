import React from 'react'
import { motion } from 'framer-motion'
import Styles from './AnimatedHeader.module.scss'
import { useRouter } from 'next/router';

type AnimatedHeaderProps = {
  children: string,
  split?: "letter" | "word",
  initial?: string,
  animate?: string,
  level?: number,
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
      delay: index * .06
    },
  }
}

const AnimatedHeader = ({ children, split = "word", level = 2, initial, animate }: AnimatedHeaderProps) => {
  const { locale } = useRouter()
  const words = children.trim().split(" ")
  let letterIndex = 0;
  const Header = `h${level}` as keyof JSX.IntrinsicElements;
  return <Header className={Styles.AnimatedHeader}>
    {words.map((word, index) => {
      return <React.Fragment key={word + index}>
        <span>
          <motion.span {...(split == "word" ? animateProps(initial, animate, index) : {})}>
            {split == "word" ? word : word.split("").map((letter) => {
              letterIndex++
              return <motion.span {...animateProps(initial, animate, letterIndex)} key={word + letter + (letterIndex - 1)}>
                {letter}
              </motion.span>
            })}
          </motion.span></span>
        {word.length == 1 ? <>&nbsp;</> : " "}
      </React.Fragment>
    })}
  </Header>
}

export default AnimatedHeader