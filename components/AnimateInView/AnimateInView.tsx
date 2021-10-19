import { motion, useAnimation } from "framer-motion";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { useEffect, useRef } from "react";

type AnimateInViewProps = {
  style?: React.CSSProperties,
  className?: string,
  animateFromTop?: boolean
}

const AnimateInView: React.FC<AnimateInViewProps> = ({ children, animateFromTop = false, ...rest }) => {
  const [observe, unObserve] = useIntersectionObserver()
  const controls = useAnimation()
  const wrapperRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const current = wrapperRef.current
    if (current) observe(current, () => controls.start("visible"), (entry: IntersectionObserverEntry) => { if (animateFromTop || entry.boundingClientRect.top > 0) controls.start("hidden") })
    return () => {
      if (current) unObserve(current)
    }
  }, [observe, unObserve, controls, animateFromTop])

  return <motion.div initial="hidden" ref={wrapperRef} animate={controls} {...rest}>
    {children}
  </motion.div>

}

export default AnimateInView;