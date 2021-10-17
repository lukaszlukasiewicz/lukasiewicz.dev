import { motion, useAnimation } from "framer-motion"
import Styles from './Reveal.module.scss'
import useIntersectionObserver from "hooks/useIntersectionObserver"
import { useEffect, useRef } from "react"

const wrapperVariants = {
  visible: { y: 0, scaleY: 1, transition: { ease: "easeOut", duration: .5, delay: .5 } },
  hidden: { y: "4em", scaleY: 0, transition: { ease: "easeOut" } }
}

const coverVariants = {
  visible: { scaleY: 0, transition: { ease: "easeOut", delay: 1 } },
  hidden: { scaleY: 1, transition: { ease: "easeOut" } }
}

const Reveal: React.FC<{ className?: string, color?: string }> = ({ className = "", color, children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [observe, unObserve] = useIntersectionObserver()

  useEffect(() => {
    const current = wrapperRef.current
    observe(current as HTMLElement, () => controls.start("visible"), (entry: IntersectionObserverEntry) => { console.log(entry); if (entry.boundingClientRect.top > 0) controls.start("hidden") })
  }, [observe, unObserve, controls])

  return <div ref={wrapperRef}>
    <motion.div variants={wrapperVariants} animate={controls} initial="hidden" className={[Styles.Reveal, className].join(" ")}>
      <motion.div variants={coverVariants} className={Styles.Reveal__cover} style={{ backgroundColor: color }}></motion.div>
      {children}
    </motion.div>
  </div>
}

export default Reveal