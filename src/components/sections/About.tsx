import { RevealOnScroll } from '../RevealOnScroll'
import { useTranslation } from 'react-i18next'

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

  const tools = [
    { name: 'Adobe Photoshop', src: 'src/assets/icons/photoshop.svg' },
    { name: 'Adobe Illustrator', src: 'src/assets/icons/illustrator.svg' },
    { name: 'Adobe InDesign', src: '/src/assets/icons/indesign.svg' },
    { name: 'Adobe After Effects', src: '/src/assets/icons/after-effects.svg' },
    { name: 'Adobe Premiere Pro', src: '/src/assets/icons/premiere-pro.svg' },
    {
      name: 'Adobe Lightroom',
      src: 'src/assets/icons/photoshop-lightroom.svg',
    },
    { name: 'Adobe Dimension', src: '/src/assets/icons/dimension.svg' },
    { name: 'Cinema 4D', src: '/src/assets/icons/cinema-4d.svg' },
    { name: 'Midjourney', src: '/src/assets/icons/midjourney.webp' },
  ]

  const adobeTools = tools.filter((tool) => tool.name.startsWith('Adobe'))
  const otherTools = tools.filter((tool) => !adobeTools.includes(tool))

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20 px-4"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto text-center space-y-16">
          {/* Section title */}
          <h2 className="h2-style" data-reveal-child>
            {t('about.title')}
          </h2>

          {/* Intro */}
          <p className="text-white text-lg max-w-3xl mx-auto" data-reveal-child>
            {t('about.intro')}
          </p>

          {/* Experience */}
          <h3 className="h3-style">{t('about.experience')}</h3>
          {jobs.map((job, index) => (
            <div
              key={index}
              className="backdrop-blur-md border rounded-xl p-4 shadow-sm"
            >
              <div className="flex justify-between items-center flex-wrap gap-2">
                <h4 className="h4-style">{job.title}</h4>
                <span className="text-sm text-white">{job.date}</span>
              </div>
              <p className="text-white text-left mt-1">{job.description}</p>
            </div>
          ))}

          {/* Education */}
          <h3 className="h3-style">{t('about.education')}</h3>
          <div className="backdrop-blur-md rounded-xl p-4 max-w-xl mx-auto shadow-sm">
            <h4 className="h4-style">{education.name}</h4>
            <p className="text-sm text-white">{education.years}</p>
            <p className="text-white mt-1">{education.focus}</p>
          </div>

          {/* Tools */}
          <h3 className="h3-style">{t('about.tools')}</h3>

          {/* Adobe Tools */}
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            {adobeTools.map((tool, index) => (
              <div
                key={index}
                className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
              >
                <img
                  src={tool.src}
                  alt={tool.name}
                  title={tool.name}
                  className="w-10 h-10 object-contain hover:scale-110 transition-transform duration-200"
                />
              </div>
            ))}

            {/* Other Tools */}
            <div className="flex flex-wrap justify-center gap-6">
              {otherTools.map((tool, index) => (
                <div
                  key={index}
                  className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
                >
                  <img
                    src={tool.src}
                    alt={tool.name}
                    title={tool.name}
                    className="w-10 h-10 object-contain hover:scale-110 transition-transform duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
