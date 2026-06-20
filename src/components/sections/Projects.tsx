import * as m from 'motion/react-m'
import { DEFAULT_TRANSITION, STAGGER } from '@/constants/motion'
import { PROJECTS } from '@/data/projects'
import { useTranslation } from '@/translations'

export const Projects = () => {
  const { t } = useTranslation()

  return (
    <section id="projects" className="section bg-dark" aria-label="Projects section">
      <div className="section-container text-center sm:text-left">
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={DEFAULT_TRANSITION}
        >
          {t('projects.title')}
        </m.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => {
            const title = t(`projects.items.${project.key}`, project.key)

            return (
              <m.a
                key={project.id}
                href={project.link}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ ...DEFAULT_TRANSITION, delay: index * STAGGER.projects }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View project: ${title}`}
                className="hover-card group relative block aspect-video overflow-hidden rounded-lg hover:-translate-y-0.5"
              >
                <picture>
                  <source
                    media="(max-width: 639px)"
                    srcSet={project.imageMobile}
                    type="image/webp"
                  />
                  <source
                    media="(min-width: 640px)"
                    srcSet={project.imageDesktop}
                    type="image/webp"
                  />
                  <img
                    src={project.imageDesktop}
                    alt={title}
                    loading="lazy"
                    width={800}
                    height={450}
                    decoding="async"
                    fetchPriority="low"
                    sizes="(max-width: 639px) 100vw, (min-width: 640px) 50vw, 800px"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </picture>

                <div
                  className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                />

                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                >
                  <span className="px-5 py-2 text-lg font-semibold text-white bg-black/60 rounded-lg text-center translate-y-3 group-hover:translate-y-0 transition-transform duration-300 group-hover:scale-105">
                    {title}
                  </span>
                </div>
              </m.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
