import Styles from './Projects.module.scss'
import { motion } from 'framer-motion'
import AnimateInView from 'components/AnimateInView/AnimateInView'
import useI18nContent from 'hooks/useI18nContent'
import { MdTitle } from 'react-icons/md'

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
    header: "I'm working on",
    stage: "stage",
    projects: [
      {
        image: "rps.png",
        title: "Rock Paper Scissors",
        description: "On-line version of popular game made with Blender, Three.js, React & Socket.io",
      },
      {
        image: "habitquest.png",
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
        image: "rps.png",
        title: "Rock Paper Scissors",
        description: "Wersja on-line popularnej gry stworzona przy użyciu Blendera, Three.js, React i Socket.io",
      },
      {
        image: "habitquest.png",
        title: "Habit Quest",
        description: "Mieszanka aplikacji do śledzenia nawyków i rozwoju postaci inspirowana grami RGP. Ukończ zadanie i zbieraj punkty",
      }
    ]
  }
}

type project = {
  title: string,
  description: string,
  image: string,
}

type projectProps = {
  project: project,
  index: number,
}

const Project = ({ project: project, index }: projectProps) => {

  const { stage } = useI18nContent(localeContent)
  const { image, title, description } = project
  return <div>
    <motion.img variants={getImageVariants(index)} src={`/${image}`} alt={title} />
    <motion.div variants={getDescriptionVariants(index + 1)} className={Styles.Projects__project_description}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p><strong>{stage}:</strong> Development</p>
    </motion.div>
  </div>
}


const Projects = () => {
  const { header, projects } = useI18nContent(localeContent)
  return <div>
    <motion.h2 variants={headerVariants}>{header}</motion.h2>
    <AnimateInView className={Styles.Projects}>
      {projects.map((project: project, index: number) => <Project key={index} project={project} index={index} />)}
    </AnimateInView>
  </div>
}

export default Projects