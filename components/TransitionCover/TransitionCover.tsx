import { motion } from "framer-motion"
import usePageConfig from "hooks/usePageConfig"
import { useRouter } from 'next/router'
import Styles from "./TransitionCover.module.scss"


type TransitionCoverProps = {
  direction?: "in" | "out"
}

const transition = { duration: .19, ease: "easeInOut" }

const variants = {
  visible: { scaleY: 1 },
  hidden: { scaleY: 0 },
}

const TransitionCover: React.FC<TransitionCoverProps> = ({ children, direction = "in" }) => {

  const { route } = useRouter();
  const page = usePageConfig()
  console.log(page.backgroundColor);

  const style = {
    backgroundColor: page.backgroundColor
  }
  return (<>
    {/*     <div className={`${Styles.TransitionCover} ${direction == "in" ? Styles.TransitionIn : ""}`}>
      <motion.div variants={variants} initial="visible" animate="hidden" exit="hidden" transition={{ ...transition, delay: 0 }} style={style}></motion.div>
      <motion.div variants={variants} initial="visible" animate="hidden" exit="hidden" transition={{ ...transition, delay: .2 }} style={style} ></motion.div>
      <motion.div variants={variants} initial="visible" animate="hidden" exit="hidden" transition={{ ...transition, delay: .4 }} style={style} ></motion.div>
      <motion.div variants={variants} initial="visible" animate="hidden" exit="hidden" transition={{ ...transition, delay: .6 }} style={style} ></motion.div>
      <motion.div variants={variants} initial="visible" animate="hidden" exit="hidden" transition={{ ...transition, delay: .8 }} style={style} ></motion.div>
    </div> */}
    <div className={`${Styles.TransitionCover} ${direction == "in" ? Styles.TransitionIn : ""}`}>
      <motion.div variants={variants} initial="hidden" animate="hidden" exit="visible" transition={{ ...transition, delay: 0 }} style={style} ></motion.div>
      <motion.div variants={variants} initial="hidden" animate="hidden" exit="visible" transition={{ ...transition, delay: .2 }} style={style} ></motion.div>
      <motion.div variants={variants} initial="hidden" animate="hidden" exit="visible" transition={{ ...transition, delay: .4 }} style={style} ></motion.div>
      <motion.div variants={variants} initial="hidden" animate="hidden" exit="visible" transition={{ ...transition, delay: .6 }} style={style} ></motion.div>
      <motion.div variants={variants} initial="hidden" animate="hidden" exit="visible" transition={{ ...transition, delay: .8 }} style={style} ></motion.div>
    </div>
    {children}
  </>)
}

export default TransitionCover;


/*
    <motion.div
      variants={variants}
      initial="hidden"
      animate="hidden"
      exit="visible"
      transition={{ duration: .5, ease: "easeInOut" }}
    ></motion.div>

*/