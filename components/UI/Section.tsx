import { motion, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"
import Styles from './Section.module.scss'

const sectionVariants = {
  hidden: {},
  visible: {}
}

const Section: React.FC<{ columns?: number }> = ({ children, columns }) => {

  const controls = useAnimation()
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {

    let options = {
      rootMargin: "40px",
      threshold: 0.5
    }

    const observerCb = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          controls.start("visible")
        } else {
          controls.start("hidden")
        }
      })
    }


    let observer = new IntersectionObserver(observerCb, options);
    if (sectionRef.current) observer.observe(sectionRef.current)
    const current = sectionRef.current
    return () => {
      if (current) observer.unobserve(current)
    }

  }, [controls])

  return <motion.section className={Styles.Section} ref={sectionRef} initial="hidden" variants={sectionVariants} animate={controls}>
    <div className={Styles.Container} style={{ gridTemplateColumns: columns }}>
      {children}
    </div>
  </motion.section>
}

export default Section