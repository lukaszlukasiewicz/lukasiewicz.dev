import { motion } from "framer-motion"
import { BsArrowDown } from "react-icons/bs"
import Styles from "./ScrollArrow.module.scss"

const ScrollArrow = () => {
  return <motion.div className={Styles.ScrollArrow} initial={{ y: "-2em", opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: .5, duration: 1, ease: "backOut" } }} exit={{ y: "2em" }} transition={{ duration: 1, ease: "backOut" }}>
    <motion.div animate={{ y: ["-1em", "0em", "-1em", "0em", "-1em"] }} transition={{ type: "spring", stiffness: 100, duration: 3, delay: 2, repeat: Infinity }}>
      <BsArrowDown />
    </motion.div>
  </motion.div>
}

export default ScrollArrow