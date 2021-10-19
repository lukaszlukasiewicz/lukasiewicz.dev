import { useAnimation } from "framer-motion"
import Styles from './Section.module.scss'
import AnimateInView from "components/AnimateInView/AnimateInView"

const Section: React.FC<{ className?: string, containerClassName?: string }> = ({ className = "", containerClassName = "", children }) => {

  const controls = useAnimation()

  return <AnimateInView className={[Styles.Section, className].join(' ')} >
    <div className={[Styles.Container, containerClassName].join(" ")} >
      {children}
    </div>
  </AnimateInView>
}

export default Section