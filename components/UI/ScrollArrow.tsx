import { motion } from "framer-motion"
import { BsArrowDown } from "react-icons/bs"
import Styles from "./ScrollArrow.module.scss"

const ScrollArrow = () => {
  return <motion.div className={Styles.ScrollArrow} initial={{ y: "-2em", opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: .5, duration: 1, ease: "backOut" } }} exit={{ y: "2em", opacity: 0 }} transition={{ duration: 1, ease: "backOut" }}>
    <motion.div animate={{ y: ["-1em", "0em"] }} transition={{ type: "tween", duration: 1.5, delay: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}>
      <BsArrowDown />
    </motion.div>
  </motion.div>
}

export default ScrollArrow