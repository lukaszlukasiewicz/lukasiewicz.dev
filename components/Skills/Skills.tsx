import Styles from "./Skills.module.scss"
import { AnimatePresence, motion, useAnimation } from "framer-motion"
import { MouseEventHandler, useState } from "react";
import useMediaQuery from 'hooks/useMediaQuery'
import AnimateInView from "components/AnimateInView/AnimateInView";

const getLinkVariants = (index: number) => {
  return {
    visible: { x: 0, opacity: 1, transition: { delay: index * .3, type: "spring" } },
    hidden: { x: ".5em", opacity: 0, transition: { type: "spring" } }
  }
}

const tabsContainerVariants = {
  visible: { y: 0, opacity: 1, transition: { delay: 1 } },
  hidden: { y: "1em", opacity: 0 }
}

const tabVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}

const design = <>Logo & Identity <span>{"//"}</span> Design Systems <span>{"//"}</span> UI & UX <span>{"//"}</span> Web Design <span>{"//"}</span> Print Design</>
const development = <>HTML <span>{"//"}</span> CSS <span>{"//"}</span> SASS <span>{"//"}</span> Javascript <span>{"//"}</span> TypeScript <span>{"//"}</span> React <span>{"//"}</span> Next.js <span>{"//"}</span> Strapi <span>{"//"}</span> Node.js <span>{"//"}</span> PHP <span>{"//"}</span> Wordpress</>

const Skils = () => {
  const [show, setShow] = useState("design")
  const isMobile = useMediaQuery("(max-width:1000px)")

  const handleClick = (show = "design"): MouseEventHandler => {
    return (e) => {
      e.preventDefault();
      setShow(show)
    }
  }

  return <AnimateInView className={Styles.Skills}>
    {!isMobile && <>
      <div>
        <motion.div variants={getLinkVariants(1)}>
          <a href="#" data-cursor="design" className={show == "design" ? Styles.Tab__active : ""} onClick={handleClick("design")}>Design</a>
        </motion.div>
        <motion.div variants={getLinkVariants(2)}>
          <a href="#" data-cursor="code" className={show == "development" ? Styles.Tab__active : ""} onClick={handleClick("development")}>Development</a>
        </motion.div>
      </div>
      <motion.div variants={tabsContainerVariants}>
        <AnimatePresence mode="wait">
          {show == "design" && <motion.div className={Styles.SkillsTab} key="deign" variants={tabVariants} animate="visible" exit="hidden" initial="hidden">
            {design}
          </motion.div>}
          {show == "development" && <motion.div className={Styles.SkillsTab} key="development" variants={tabVariants} animate="visible" exit="hidden" initial="hidden">
            {development}
          </motion.div>}
        </AnimatePresence>
      </motion.div>
    </>}
    {isMobile && <>
      <motion.h4 variants={getLinkVariants(1)}>Design</motion.h4>
      <motion.div className={Styles.SkillsTab} key="deign" variants={getLinkVariants(2)}>
        {design}
      </motion.div>
      <motion.h4 variants={getLinkVariants(3)}>Development</motion.h4>
      <motion.div className={Styles.SkillsTab} key="development" variants={getLinkVariants(4)}>
        {development}
      </motion.div>
    </>}
  </AnimateInView>

}

export default Skils