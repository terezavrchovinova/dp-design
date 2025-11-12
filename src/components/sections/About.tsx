import { useTranslation } from 'react-i18next'
import { JobCard } from '../JobCard'
import { ToolIcon } from '../ToolIcon'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { useRef } from 'react'

// Tool icon assets
import photoshopIcon from '../../assets/icons/photoshop.svg'
import illustratorIcon from '../../assets/icons/illustrator.svg'
import indesignIcon from '../../assets/icons/indesign.svg'
import afterEffectsIcon from '../../assets/icons/after-effects.svg'
import premiereProIcon from '../../assets/icons/premiere-pro.svg'
import lightroomIcon from '../../assets/icons/photoshop-lightroom.svg'
import dimensionIcon from '../../assets/icons/dimension.svg'
import cinema4dIcon from '../../assets/icons/cinema-4d.svg'
import midjourneyIcon from '../../assets/icons/midjourney.webp'

// Types
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

// Constants
/** Tools configuration */
const TOOLS: Tool[] = [
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

/** Adobe tools (filtered from all tools) */
const ADOBE_TOOLS = TOOLS.filter((tool) => tool.name.startsWith('Adobe'))

/** Other tools (non-Adobe) */
const OTHER_TOOLS = TOOLS.filter((tool) => !ADOBE_TOOLS.includes(tool))

/**
 * About component
 *
 * Renders experience, education, and tools sections.
 * Includes animated tool icons with staggered entrance animations.
 *
 * @returns About section element
 */
export const About = () => {
  const { t } = useTranslation()

  // Get jobs from translations
  const jobs = t('about.jobs', { returnObjects: true }) as Job[]

  // Get school information from translations
  const school = t('about.school', { returnObjects: true }) as School

  // Ref for tools section intersection observer
  const toolsRef = useRef(null)
  const toolsInView = useInView(toolsRef, { once: true })

  return (
    <section
      id="about"
      className="section bg-[var(--color-dark)]"
      aria-label="About section"
    >
      <div className="container-content">
        {/* Experience Section */}
        <div>
          <h3>{t('about.experience')}</h3>
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <JobCard key={`${job.title}-${index}`} {...job} />
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <h3>{t('about.education')}</h3>
          <div className="space-y-6">
            <JobCard
              title={school.name}
              date={school.years}
              description={school.focus}
            />
          </div>
        </div>

        {/* Tools Section */}
        <div ref={toolsRef}>
          <motion.h3
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
            {ADOBE_TOOLS.map((tool) => (
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
            {OTHER_TOOLS.length > 0 && (
              <motion.div
                key="other-tools"
                className="flex flex-wrap justify-center gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
              >
                {OTHER_TOOLS.map((tool) => (
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
