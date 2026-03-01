import { motion } from 'motion/react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import afterEffectsIcon from '../../assets/icons/after-effects.svg'
import cinema4dIcon from '../../assets/icons/cinema-4d.svg'
import dimensionIcon from '../../assets/icons/dimension.svg'
import figmaIcon from '../../assets/icons/figma.svg'
import illustratorIcon from '../../assets/icons/illustrator.svg'
import indesignIcon from '../../assets/icons/indesign.svg'
import midjourneyIcon from '../../assets/icons/midjourney.webp'
import photoshopIcon from '../../assets/icons/photoshop.svg'
import lightroomIcon from '../../assets/icons/photoshop-lightroom.svg'
import premiereProIcon from '../../assets/icons/premiere-pro.svg'
import { DEFAULT_TRANSITION } from '../../constants/motion'
import { TimelineEntry } from '../ExperienceTimeline'
import { ToolIcon } from '../ToolIcon'

interface Tool {
  name: string
  src: string
}

interface Job {
  title: string
  date: string
  description: string
}

interface School {
  name: string
  years: string
  focus: string
}

const TOOLS: Tool[] = [
  { name: 'Adobe Photoshop', src: photoshopIcon },
  { name: 'Adobe Illustrator', src: illustratorIcon },
  { name: 'Adobe InDesign', src: indesignIcon },
  { name: 'Adobe After Effects', src: afterEffectsIcon },
  { name: 'Adobe Premiere Pro', src: premiereProIcon },
  { name: 'Adobe Lightroom', src: lightroomIcon },
  { name: 'Adobe Dimension', src: dimensionIcon },
  { name: 'Figma', src: figmaIcon },
  { name: 'Cinema 4D', src: cinema4dIcon },
  { name: 'Midjourney', src: midjourneyIcon },
]

export const About = () => {
  const { t } = useTranslation()

  const jobs = t('about.jobs', { returnObjects: true }) as Job[]
  const school = t('about.school', { returnObjects: true }) as School

  const toolsRef = useRef(null)

  return (
    <section id="about" className="section bg-[var(--color-dark)]" aria-label="About section">
      <div className="w-full max-w-[1600px] px-6 sm:px-10 mx-auto space-y-16 text-center sm:text-left">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={DEFAULT_TRANSITION}
          >
            {t('about.experience')}
          </motion.h2>
          <div className="relative">
            {jobs.map((job, index) => (
              <TimelineEntry
                key={`${job.title}-${index}`}
                title={job.title}
                date={job.date}
                description={job.description}
                isLast={index === jobs.length - 1}
                staggerDelay={index * 0.08}
              />
            ))}
          </div>

          <motion.h2
            className="mb-8 mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={DEFAULT_TRANSITION}
          >
            {t('about.education')}
          </motion.h2>
          <div className="relative">
            <TimelineEntry
              title={school.name}
              date={school.years}
              description={school.focus}
              isLast
              staggerDelay={0.1}
            />
          </div>
        </div>

        <div ref={toolsRef}>
          <motion.h2
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={DEFAULT_TRANSITION}
          >
            {t('about.tools')}
          </motion.h2>

          <div className="flex flex-wrap justify-center gap-6">
            {TOOLS.map((tool, index) => (
              <ToolIcon key={tool.name} {...tool} staggerDelay={index * 0.05} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
