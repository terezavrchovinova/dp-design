import { motion } from 'motion/react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_TRANSITION } from '../../constants/motion'
import { TOOLS } from '../../data/tools'
import { TimelineEntry } from '../ExperienceTimeline'
import { ToolIcon } from '../ToolIcon'

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
