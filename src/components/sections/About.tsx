'use client'

import { useTranslation } from 'react-i18next'
import { JobCard } from '../JobCard'
import { ToolIcon } from '../ToolIcon'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'

import photoshopIcon from '../../assets/icons/photoshop.svg'
import illustratorIcon from '../../assets/icons/illustrator.svg'
import indesignIcon from '../../assets/icons/indesign.svg'
import afterEffectsIcon from '../../assets/icons/after-effects.svg'
import premiereProIcon from '../../assets/icons/premiere-pro.svg'
import lightroomIcon from '../../assets/icons/photoshop-lightroom.svg'
import dimensionIcon from '../../assets/icons/dimension.svg'
import cinema4dIcon from '../../assets/icons/cinema-4d.svg'
import midjourneyIcon from '../../assets/icons/midjourney.webp'

const tools = [
  { name: 'Adobe Photoshop', src: photoshopIcon },
  { name: 'Adobe Illustrator', src: illustratorIcon },
  { name: 'Adobe InDesign', src: indesignIcon },
  { name: 'Adobe After Effects', src: afterEffectsIcon },
  { name: 'Adobe Premiere Pro', src: premiereProIcon },
  { name: 'Adobe Lightroom', src: lightroomIcon },
  { name: 'Adobe Dimension', src: dimensionIcon },
  { name: 'Cinema 4D', src: cinema4dIcon },
  { name: 'Midjourney', src: midjourneyIcon },
]

const adobeTools = tools.filter((tool) => tool.name.startsWith('Adobe'))
const otherTools = tools.filter((tool) => !adobeTools.includes(tool))

export const About = () => {
  const { t } = useTranslation()

  const jobs = t('about.jobs', { returnObjects: true }) as {
    title: string
    date: string
    description: string
  }[]

  const school = t('about.school', { returnObjects: true }) as {
    name: string
    years: string
    focus: string
  }

  const toolsRef = useRef(null)
  const toolsInView = useInView(toolsRef, { once: true })

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-24 px-6"
      style={{ backgroundColor: 'var(--color-dark)' }}
    >
      <div className="w-full max-w-6xl space-y-16">
        {/* Title */}
        <h2
          className="text-center text-4xl md:text-5xl font-bold tracking-tight"
          style={{ color: 'var(--color-white)' }}
        >
          {t('about.title')}
        </h2>

        {/* Experience */}
        <div>
          <h3
            className="text-2xl font-semibold mb-6 text-center"
            style={{ color: 'var(--color-white)' }}
          >
            {t('about.experience')}
          </h3>
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <JobCard key={`${job.title}-${index}`} {...job} />
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3
            className="text-2xl font-semibold mb-6 text-center"
            style={{ color: 'var(--color-white)' }}
          >
            {t('about.education')}
          </h3>
          <div className="space-y-6">
            <JobCard
              title={school.name}
              date={school.years}
              description={school.focus}
            />
          </div>
        </div>

        {/* Tools */}
        <div ref={toolsRef}>
          <motion.h3
            className="text-2xl font-semibold mb-12 text-center"
            style={{ color: 'var(--color-white)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={toolsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {t('about.tools')}
          </motion.h3>

          {/* Adobe Tools */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {adobeTools.map((tool) => (
              <motion.div
                key={tool.name}
                layout
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <ToolIcon {...tool} />
              </motion.div>
            ))}
          </motion.div>

          {/* Other Tools */}
          <AnimatePresence>
            {otherTools.length > 0 && (
              <motion.div
                key="other-tools"
                className="flex flex-wrap justify-center gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                {otherTools.map((tool) => (
                  <motion.div
                    key={tool.name}
                    layout
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      type: 'spring',
                      stiffness: 250,
                      damping: 18,
                    }}
                  >
                    <ToolIcon {...tool} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
