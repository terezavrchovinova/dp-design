import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import afterEffectsIcon from '../../assets/icons/after-effects.svg'
import cinema4dIcon from '../../assets/icons/cinema-4d.svg'
import dimensionIcon from '../../assets/icons/dimension.svg'
import figmaIcon from '../../assets/icons/figma.svg'
import illustratorIcon from '../../assets/icons/illustrator.svg'
import indesignIcon from '../../assets/icons/indesign.svg'
import midjourneyIcon from '../../assets/icons/midjourney.webp'
// Tool icon assets
import photoshopIcon from '../../assets/icons/photoshop.svg'
import lightroomIcon from '../../assets/icons/photoshop-lightroom.svg'
import premiereProIcon from '../../assets/icons/premiere-pro.svg'
import { TimelineEntry } from '../ExperienceTimeline'
import { ToolIcon } from '../ToolIcon'

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
  { name: 'Figma', src: figmaIcon },
  { name: 'Cinema 4D', src: cinema4dIcon },
  { name: 'Midjourney', src: midjourneyIcon },
]

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

  const toolsRef = useRef(null)

  return (
    <section id="about" className="section bg-[var(--color-dark)]" aria-label="About section">
      <div className="container-content">
        {/* Experience & Education - Timeline layout */}
        <div>
          <h3 className="mb-10 text-center text-2xl md:text-2xl lg:text-3xl">{t('about.experience')}</h3>
          <div className="relative">
            {jobs.map((job, index) => (
              <TimelineEntry
                key={`${job.title}-${index}`}
                title={job.title}
                date={job.date}
                description={job.description}
                isLast={index === jobs.length - 1}
              />
            ))}
          </div>

          <h3 className="mb-10 mt-16 text-center text-2xl md:text-2xl lg:text-3xl">{t('about.education')}</h3>
          <div className="relative">
            <TimelineEntry
              title={school.name}
              date={school.years}
              description={school.focus}
              isLast
            />
          </div>
        </div>

        {/* Tools Section */}
        <div ref={toolsRef}>
          <h3 className="text-center text-2xl md:text-2xl lg:text-3xl">{t('about.tools')}</h3>

          <div className="flex flex-wrap justify-center gap-5">
            {TOOLS.map((tool) => (
              <ToolIcon key={tool.name} {...tool} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
