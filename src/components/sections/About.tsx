import { RevealOnScroll } from '../RevealOnScroll'
import { useTranslation } from 'react-i18next'
import { JobCard } from '../JobCard'
import { SchoolCard } from '../SchoolCard'
import { ToolIcon } from '../ToolIcon'

const tools = [
  { name: 'Adobe Photoshop', src: 'src/assets/icons/photoshop.svg' },
  { name: 'Adobe Illustrator', src: 'src/assets/icons/illustrator.svg' },
  { name: 'Adobe InDesign', src: '/src/assets/icons/indesign.svg' },
  { name: 'Adobe After Effects', src: '/src/assets/icons/after-effects.svg' },
  { name: 'Adobe Premiere Pro', src: '/src/assets/icons/premiere-pro.svg' },
  { name: 'Adobe Lightroom', src: 'src/assets/icons/photoshop-lightroom.svg' },
  { name: 'Adobe Dimension', src: '/src/assets/icons/dimension.svg' },
  { name: 'Cinema 4D', src: '/src/assets/icons/cinema-4d.svg' },
  { name: 'Midjourney', src: '/src/assets/icons/midjourney.webp' },
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

  const education = t('about.school', { returnObjects: true }) as {
    name: string
    years: string
    focus: string
  }

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="w-full max-w-6xl space-y-12" data-reveal-child>
          <h2 className="h2-style">{t('about.title')}</h2>

          {/* Experience */}
          <div>
            <h3 className="h3-style">{t('about.experience')}</h3>
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <JobCard key={`${job.title}-${index}`} {...job} />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="h3-style mb-6">{t('about.education')}</h3>
            <SchoolCard {...education} />
          </div>

          {/* Tools */}
          <div>
            <h3 className="h3-style mb-6">{t('about.tools')}</h3>

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {adobeTools.map((tool) => (
                <ToolIcon key={tool.name} {...tool} />
              ))}
            </div>

            {otherTools.length > 0 && (
              <div className="flex flex-wrap justify-center gap-6">
                {otherTools.map((tool) => (
                  <ToolIcon key={tool.name} {...tool} />
                ))}
              </div>
            )}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
