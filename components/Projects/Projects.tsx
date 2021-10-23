import Styles from './Projects.module.scss'
import { motion } from 'framer-motion'
import AnimateInView from 'components/AnimateInView/AnimateInView'
import useI18nContent from 'hooks/useI18nContent'

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


const localeContent = {
  en: {
    header: "Currently working on",
    stage: "stage",
    projects: [
      {
        title: "Rock Paper Scissors",
        description: "On-line version of popular game made with Blender, Three.js, React & Socket.io",
      },
      {
        title: "Habit Quest",
        description: "Mix of Habit tracking app & character development inspired by RGP games. Finish quest and collect points",
      }
    ]
  },
  pl: {
    header: "Aktualnie pracuje nad",
    stage: "status",
    projects: [
      {
        title: "Rock Paper Scissors",
        description: "Wersja on-line popularnej gry stworzona przy użyciu Blendera, Three.js, React i Socket.io",
      },
      {
        title: "Habit Quest",
        description: "Mieszanka aplikacji do śledzenia nawyków i rozwoju postaci inspirowana grami RGP. Ukończ zadanie i zbieraj punkty",
      }
    ]
  }
}



const Projects: React.FC = () => {
  const { header, stage, projects } = useI18nContent(localeContent)
  return <div>
    <motion.h2 variants={headerVariants}>{header}</motion.h2>
    <AnimateInView className={Styles.Projects}>
      <div>
        <motion.img variants={getImageVariants(1)} src="/rps.png" alt="Rock paper scissors" />
        <motion.div variants={getDescriptionVariants(2)} className={Styles.Projects__project_description}>
          <h3>{projects[0].title}</h3>
          <p>{projects[0].description}</p>
          <p><strong>{stage}:</strong> Development</p>
        </motion.div>
      </div>
      <div>
        <motion.img variants={getImageVariants(2)} src="/rps.png" alt="Rock paper scissors" />
        <motion.div variants={getDescriptionVariants(3)} className={Styles.Projects__project_description}>
          <h3>{projects[1].title}</h3>
          <p>{projects[1].description}</p>
          <p><strong>{stage}:</strong> Design</p>
        </motion.div>
      </div>
    </AnimateInView>
  </div>
}

export default Projects