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
  visible: { y: 0 },
  hidden: { y: "1.1em" }
}

const AnimatedHeader = ({ children, split = "word", initial, animate }: AnimatedHeaderProps) => {
  const { locale } = useRouter()
  const words = children.trim().split(split == "word" ? " " : "")
  return <h1 className={Styles.AnimatedHeader} >
    {words.map((word, index) => {
      if (word == " ") return <React.Fragment key={(locale as string) + index}> {word} </React.Fragment>
      return <React.Fragment key={(locale as string) + index}>
        <span>
          <motion.span variants={variants} initial={initial} animate={animate} transition={{ duration: .7, ease: "backOut", delay: index * .05 }}>
            {word}
          </motion.span>
        </span>
        {split == "word" && " "}
      </React.Fragment>
    })}
  </h1 >
}

export default AnimatedHeader