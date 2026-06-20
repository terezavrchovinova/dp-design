import * as m from 'motion/react-m'
import { useTranslation } from 'react-i18next'
import { TimelineEntry } from '@/components/ui/ExperienceTimeline'
import { ToolIcon } from '@/components/ui/ToolIcon'
import { DEFAULT_TRANSITION, STAGGER } from '@/constants/motion'
import { TOOLS } from '@/data/tools'

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

  return (
    <section id="about" className="section bg-dark" aria-label="About section">
      <div className="section-container space-y-16 text-center sm:text-left">
        <div className="max-w-3xl mx-auto">
          <m.h2
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={DEFAULT_TRANSITION}
          >
            {t('about.experience')}
          </m.h2>
          <div className="relative">
            {jobs.map((job, index) => (
              <TimelineEntry
                key={`${job.title}-${job.date}`}
                title={job.title}
                date={job.date}
                description={job.description}
                isLast={index === jobs.length - 1}
                staggerDelay={index * STAGGER.timeline}
              />
            ))}
          </div>

          <m.h2
            className="mb-8 mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={DEFAULT_TRANSITION}
          >
            {t('about.education')}
          </m.h2>
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

        <div>
          <m.h2
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={DEFAULT_TRANSITION}
          >
            {t('about.tools')}
          </m.h2>

          <div className="flex flex-wrap justify-center gap-6">
            {TOOLS.map((tool, index) => (
              <ToolIcon key={tool.name} {...tool} staggerDelay={index * STAGGER.tools} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
