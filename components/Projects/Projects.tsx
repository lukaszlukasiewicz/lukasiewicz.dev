import Styles from './Projects.module.scss'
import { motion } from 'framer-motion'
import AnimateInView from 'components/AnimateInView/AnimateInView'

const headerVariants = {
  visible: { y: 0, opacity: 1, transition: { type: "spring" } },
  hidden: { y: "2em", opacity: 0 },
}

const getImageVariants = (index: number) => {
  return {
    visible: { y: 0, opacity: 1, transition: { type: "spring", delay: index * .3 } },
    hidden: { y: "-2em", opacity: 0 },
  }
}

const getDescriptionVariants = (index: number) => {
  return {
    visible: { y: 0, opacity: 1, transition: { type: "spring", delay: index * .3 } },
    hidden: { y: "2em", opacity: 0 },
  }
}


const Projects: React.FC = () => {
  return <div>
    <motion.h2 variants={headerVariants}>Working on</motion.h2>
    <AnimateInView className={Styles.Projects}>
      <div>
        <motion.img variants={getImageVariants(1)} src="/rps.png" alt="Rock paper scissors" />
        <motion.div variants={getDescriptionVariants(2)} className={Styles.Projects__project_description}>
          <h3>Rock Paper Scissors</h3>
          <p>On-line version of popular game made with Blender, Three.js, React & Socket.io</p>
          <p><strong>stage:</strong> Development</p>
        </motion.div>
      </div>
      <div>
        <motion.img variants={getImageVariants(2)} src="/rps.png" alt="Rock paper scissors" />
        <motion.div variants={getDescriptionVariants(3)} className={Styles.Projects__project_description}>
          <h3>Habit Quest</h3>
          <p>Mix of Habit tracking app & character developemnt inspired by RGP games. Finish quest and collect points</p>
          <p><strong>stage:</strong> Design</p>
        </motion.div>
      </div>
    </AnimateInView>
  </div>
}

export default Projects