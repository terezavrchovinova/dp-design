import * as m from 'motion/react-m'
import { FADE_UP_IN_VIEW, fadeUpDelayed, STAGGER } from '@/constants/motion'
import { PROJECTS } from '@/data/projects'
import { useTranslation } from '@/translations'

export const Projects = () => {
  const { t } = useTranslation()

  return (
    <section id="projects" className="section bg-dark" aria-label="Projects section">
      <div className="section-container text-center sm:text-left">
        <m.h2 {...FADE_UP_IN_VIEW}>{t('projects.title')}</m.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
          {PROJECTS.map((project, index) => {
            const title = t(`projects.items.${project.key}`, project.key)
            // Titles follow "Category – Name" in both locales; the split feeds
            // the visible caption (mono category eyebrow + project name).
            const [category, ...nameParts] = title.split(/\s[-–]\s/)
            const name = nameParts.join(' – ')

            return (
              <m.a
                key={project.key}
                href={project.link}
                {...fadeUpDelayed(24, index * STAGGER.projects)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View project: ${title}`}
                className={`group block ${index % 2 === 1 ? 'sm:mt-14' : ''}`}
              >
                <div className="relative aspect-video overflow-hidden rounded-lg border border-border group-hover:border-accent transition-[border-color,box-shadow] duration-(--duration-base) group-hover:shadow-(--card-glow)">
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
                      className="w-full h-full object-cover saturate-[0.75] group-hover:saturate-100 group-hover:scale-105 transition-[transform,filter] duration-(--duration-slow)"
                    />
                  </picture>
                </div>

                <div className="mt-3 flex flex-col items-center sm:items-start gap-1">
                  {name && (
                    <span className="eyebrow text-gray group-hover:text-accent transition-colors duration-(--duration-base)">
                      {category}
                    </span>
                  )}
                  <span className="text-base md:text-lg font-semibold text-white">
                    {name || title}
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
