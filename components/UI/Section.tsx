import { motion, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"
import Styles from './Section.module.scss'
import useIntersectionObserver from "hooks/useIntersectionObserver"

const sectionVariants = {
  hidden: {},
  visible: {}
}

const Section: React.FC<{ className?: string, containerClassName?: string }> = ({ className = "", containerClassName = "", children }) => {

  const controls = useAnimation()
  const sectionRef = useRef<HTMLElement>(null)
  const [observe, unObserve] = useIntersectionObserver()
  useEffect(() => {
    const current = sectionRef.current
    if (current) observe(current, () => controls.start("visible"), (entry: IntersectionObserverEntry) => { console.log(entry); if (entry.boundingClientRect.top > 0) controls.start("hidden") })
    return () => {
      if (current) unObserve(current)
    }

  }, [observe, unObserve, controls])


  return <motion.section className={[Styles.Section, className].join(' ')} ref={sectionRef} initial="hidden" variants={sectionVariants} animate={controls}>
    <div className={[Styles.Container, containerClassName].join(" ")} >
      {children}
    </div>
  </motion.section>
}

export default Section