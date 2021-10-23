import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import Styles from "./Cursor.module.scss"
import { BsFillMouseFill, BsInputCursorText } from "react-icons/bs"
import { BiLink, BiCodeAlt, BiPencil } from "react-icons/bi"
import { HiOutlineMail } from "react-icons/hi"
import { MdOutlineWavingHand } from "react-icons/md"

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
const ScrollCursor = (props: CursorProps) => <div className={Styles.ScrollCursor}>
  <CursorBg className={Styles.CursorBg} bgColor={props.bgColor}></CursorBg>
  <motion.div className={Styles.CursorContent} variants={contentVariants} initial="hidden" animate="visible" exit="hidden" key="scrollContent" style={{ color: props.color }}><BsFillMouseFill /> </motion.div>
</div>

const LinkCursor = (props: CursorProps) => <div className={Styles.LinkCursor}>
  <CursorBg className={Styles.CursorBg} bgColor={props.bgColor}></CursorBg>
  <motion.div className={Styles.CursorContent} variants={contentVariants} initial="hidden" animate="visible" exit="hidden" key="linkContent" style={{ color: props.color }}><BiLink /> </motion.div>
</div>

const DesignCursor = (props: CursorProps) => <div className={Styles.DesignCursor}>
  <CursorBg className={Styles.CursorBg} bgColor={props.bgColor}></CursorBg>
  <motion.div className={Styles.CursorContent} variants={contentVariants} initial="hidden" animate="visible" exit="hidden" key="linkContent" style={{ color: props.color }}><BiPencil /> </motion.div>
</div>

const CodeCursor = (props: CursorProps) => <div className={Styles.CodeCursor}>
  <CursorBg className={Styles.CursorBg} bgColor={props.bgColor}></CursorBg>
  <motion.div className={Styles.CursorContent} variants={contentVariants} initial="hidden" animate="visible" exit="hidden" key="linkContent" style={{ color: props.color }}><BiCodeAlt /> </motion.div>
</div>


const MailCursor = (props: CursorProps) => <div className={Styles.MailCursor}>
  <CursorBg className={Styles.CursorBg} bgColor={props.bgColor}></CursorBg>
  <motion.div className={Styles.CursorContent} variants={contentVariants} initial="hidden" animate="visible" exit="hidden" key="linkContent" style={{ color: props.color }}><HiOutlineMail /> </motion.div>
</div>

const InputCursor = (props: CursorProps) => <div className={Styles.InputCursor}>
  <CursorBg className={Styles.CursorBg} bgColor={props.bgColor}></CursorBg>
  <motion.div className={Styles.CursorContent} variants={contentVariants} initial="hidden" animate="visible" exit="hidden" key="linkContent" style={{ color: props.color }}><BsInputCursorText /> </motion.div>
</div>


const WaveCursor = (props: CursorProps) => <div className={Styles.WaveCursor}>
  <CursorBg className={Styles.CursorBg} bgColor={props.bgColor}></CursorBg>
  <motion.div className={Styles.CursorContent} variants={contentVariants} initial="hidden" animate="visible" exit="hidden" key="linkContent" style={{ color: props.color }}><MdOutlineWavingHand /> </motion.div>
</div>

const cursors = {
  "default": DefaultCursor,
  "scroll": ScrollCursor,
  link: LinkCursor,
  code: CodeCursor,
  design: DesignCursor,
  mail: MailCursor,
  input: InputCursor,
  wave: WaveCursor
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
      if (newCursor != cursor) setCursor(newCursor)
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
  }} style={{ position: "absolute", zIndex: 999999999, pointerEvents: "none" }}>
    <AnimatePresence>
      <CurrentCursor key={cursor} color={color} bgColor={bgColor} />
    </AnimatePresence>
  </motion.div>
}

export default Cursor