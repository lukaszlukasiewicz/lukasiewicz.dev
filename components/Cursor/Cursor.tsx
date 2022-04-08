import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import Styles from "./Cursor.module.scss"
import { BsMouse, BsInputCursorText } from "react-icons/bs"
import { BiLink, BiCodeAlt, BiPencil } from "react-icons/bi"
import { HiOutlineMail } from "react-icons/hi"
import { MdOutlineWavingHand } from "react-icons/md"
import { FaFacebook, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa"
import { IconType } from "react-icons/lib"

const cursorVariants = {
  visible: { scale: 1, opacity: 1, transition: { type: "spring" } },
  hidden: { scale: 0, opacity: 0, transition: { type: "spring" } }
}
const contentVariants = {
  visible: { scale: 1, opacity: 1, transition: { type: "spring" } },
  hidden: { scale: 1.5, opacity: 0, transition: { type: "spring" } }
}

type CursorProps = {
  color?: string,
  bgColor?: string,
  className?: string,
}


const CursorBg: React.FC<CursorProps> = ({ className, children, color, bgColor }) => {
  return <motion.div className={className} variants={cursorVariants} initial="hidden" animate="visible" exit="hidden" key="default" style={{ backgroundColor: bgColor }}>
    {children}
  </motion.div>
}


const DefaultCursor = (props: CursorProps) => <CursorBg className={Styles.DefaultCursor} bgColor={props.bgColor}></CursorBg>

const getIconCuror = ({ className, Icon }: { className: string, Icon?: IconType }) => {
  const Cursor = (props: CursorProps) => <div className={className}>
    <CursorBg className={Styles.CursorBg} bgColor={props.bgColor}></CursorBg>
    {Icon && <motion.div className={Styles.CursorContent} variants={contentVariants} initial="hidden" animate="visible" exit="hidden" key="linkContent" style={{ color: props.color }}><Icon /> </motion.div>}
  </div>
  return Cursor
}

const cursors = {
  default: DefaultCursor,
  scroll: getIconCuror({ className: Styles.ScrollCursor, Icon: BsMouse }),
  link: getIconCuror({ className: Styles.LinkCursor, Icon: BiLink }),
  code: getIconCuror({ className: Styles.CodeCursor, Icon: BiCodeAlt }),
  design: getIconCuror({ className: Styles.DesignCursor, Icon: BiPencil }),
  mail: getIconCuror({ className: Styles.MailCursor, Icon: HiOutlineMail }),
  input: getIconCuror({ className: Styles.InputCursor, Icon: BsInputCursorText }),
  wave: getIconCuror({ className: Styles.WaveCursor, Icon: MdOutlineWavingHand }),
  Facebook: getIconCuror({ className: Styles.LinkCursor, Icon: FaFacebook }),
  GitHub: getIconCuror({ className: Styles.LinkCursor, Icon: FaGithub }),
  LinkedIn: getIconCuror({ className: Styles.LinkCursor, Icon: FaLinkedin }),
  Instagram: getIconCuror({ className: Styles.LinkCursor, Icon: FaInstagram }),
}

const Cursor: React.FC = () => {
  const [cursor, setCursor] = useState("default")
  const [position, setPosition] = useState([0, 0])
  const [x, y] = position;
  const [cursorType, bgColor, color] = cursor.split(";")
  const CurrentCursor = cursors[cursorType as keyof typeof cursors]
  useEffect(() => {
    const hasPointer = window.matchMedia("(pointer: fine)").matches
    if (!hasPointer) return;
    const handleMouseOver = (event: MouseEvent) => {
      const { target } = event
      const cursorElement = (target as HTMLElement).closest("[data-cursor]") as HTMLElement
      const newCursor = cursorElement?.dataset.cursor || "default"
      if (newCursor != cursor) setCursor(newCursor);
    }
    const handleMouseMove = (e: MouseEvent) => {
      setPosition([e.pageX, e.pageY])
    }
    const handleWheel = (e: WheelEvent) => {
      setPosition([e.pageX + e.deltaX, e.pageY + e.deltaY])
    }
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('wheel', handleWheel)
    return () => {
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [cursor])
  return <motion.div className={Styles.Cursor} animate={{
    x, y,
    transition: { type: "spring", damping: 15 }
  }}>
    <AnimatePresence>
      <CurrentCursor key={cursor} color={color} bgColor={bgColor} />
    </AnimatePresence>
  </motion.div>
}

export default Cursor