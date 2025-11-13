import { useTranslation } from 'react-i18next'

// Project assets - Desktop
import kynezImgDesktop from '../../assets/project_thumbnails/desktop/kynez.webp'
import variousBannersImgDesktop from '../../assets/project_thumbnails/desktop/various_banners.webp'
import saleskitImgDesktop from '../../assets/project_thumbnails/desktop/saleskit.webp'
import ditaImgDesktop from '../../assets/project_thumbnails/desktop/dita.webp'
import maastrichtImgDesktop from '../../assets/project_thumbnails/desktop/maastricht.webp'
import letItRollImgDesktop from '../../assets/project_thumbnails/desktop/let_it_roll.webp'
import newtoniaImgDesktop from '../../assets/project_thumbnails/desktop/newtonia.webp'
import brejchaImgDesktop from '../../assets/project_thumbnails/desktop/brejcha.webp'
import renaissanceImgDesktop from '../../assets/project_thumbnails/desktop/mona_lisa.webp'
import deathvalleyImgDesktop from '../../assets/project_thumbnails/desktop/death_valley.webp'
import jurassicImgDesktop from '../../assets/project_thumbnails/desktop/jurassic_adventure.webp'
import tmobileImgDesktop from '../../assets/project_thumbnails/desktop/t-mobile.webp'

// Project assets - Mobile
import kynezImgMobile from '../../assets/project_thumbnails/mobile/kynez.webp'
import variousBannersImgMobile from '../../assets/project_thumbnails/mobile/various_banners.webp'
import saleskitImgMobile from '../../assets/project_thumbnails/mobile/saleskit.webp'
import ditaImgMobile from '../../assets/project_thumbnails/mobile/dita.webp'
import maastrichtImgMobile from '../../assets/project_thumbnails/mobile/maastricht.webp'
import letItRollImgMobile from '../../assets/project_thumbnails/mobile/let_it_roll.webp'
import newtoniaImgMobile from '../../assets/project_thumbnails/mobile/newtonia.webp'
import brejchaImgMobile from '../../assets/project_thumbnails/mobile/brejcha.webp'
import renaissanceImgMobile from '../../assets/project_thumbnails/mobile/mona_lisa.webp'
import deathvalleyImgMobile from '../../assets/project_thumbnails/mobile/death_valley.webp'
import jurassicImgMobile from '../../assets/project_thumbnails/mobile/jurassic_adventure.webp'
import tmobileImgMobile from '../../assets/project_thumbnails/mobile/t-mobile.webp'

// Types
interface Project {
  id: number
  key: string
  imageMobile: string
  imageDesktop: string
  link: string
}

// Constants
/** Animation delay multiplier for staggered project animations */
const ANIMATION_DELAY_MULTIPLIER = 80

/** Project configuration */
const PROJECTS: Project[] = [
  {
    id: 1,
    key: 'kynez',
    imageMobile: kynezImgMobile,
    imageDesktop: kynezImgDesktop,
    link: 'https://www.behance.net/gallery/222330047/Kynez-Sportswear-brand-identity',
  },
  {
    id: 2,
    key: 'tmobile',
    imageMobile: tmobileImgMobile,
    imageDesktop: tmobileImgDesktop,
    link: 'https://www.behance.net/gallery/238307417/T-Mobile-Concept-Campaign',
  },
  {
    id: 3,
    key: 'maastricht',
    imageMobile: maastrichtImgMobile,
    imageDesktop: maastrichtImgDesktop,
    link: 'https://www.behance.net/gallery/199767453/Maastricht-Festival-Visual',
  },
  {
    id: 4,
    key: 'saleskit',
    imageMobile: saleskitImgMobile,
    imageDesktop: saleskitImgDesktop,
    link: 'https://www.behance.net/gallery/219839403/Design-for-Saleskit',
  },
  {
    id: 5,
    key: 'various_banners',
    imageMobile: variousBannersImgMobile,
    imageDesktop: variousBannersImgDesktop,
    link: 'https://www.behance.net/gallery/223131257/Banner-Designs-Event-Exhibition-Series',
  },
  {
    id: 6,
    key: 'dita',
    imageMobile: ditaImgMobile,
    imageDesktop: ditaImgDesktop,
    link: 'https://www.behance.net/gallery/205350295/Dita-Von-Teese-visual',
  },
  {
    id: 7,
    key: 'letitroll',
    imageMobile: letItRollImgMobile,
    imageDesktop: letItRollImgDesktop,
    link: 'https://www.behance.net/gallery/196798719/Let-It-Roll-Festival-poster',
  },
  {
    id: 8,
    key: 'newtonia',
    imageMobile: newtoniaImgMobile,
    imageDesktop: newtoniaImgDesktop,
    link: 'https://www.behance.net/gallery/201179759/Game-designNewtonia',
  },
  {
    id: 9,
    key: 'brejcha',
    imageMobile: brejchaImgMobile,
    imageDesktop: brejchaImgDesktop,
    link: 'https://www.behance.net/gallery/189009581/Boris-Brejcha-video-spot',
  },
  {
    id: 10,
    key: 'renaissance',
    imageMobile: renaissanceImgMobile,
    imageDesktop: renaissanceImgDesktop,
    link: 'https://www.behance.net/gallery/207746525/The-Great-Masters-of-the-Renaissance-video-spot',
  },
  {
    id: 11,
    key: 'deathvalley',
    imageMobile: deathvalleyImgMobile,
    imageDesktop: deathvalleyImgDesktop,
    link: 'https://www.behance.net/gallery/200322649/Death-Valley-design',
  },
  {
    id: 12,
    key: 'jurassic',
    imageMobile: jurassicImgMobile,
    imageDesktop: jurassicImgDesktop,
    link: 'https://www.behance.net/gallery/188776307/brochure-Jurassic-Adventure',
  },
]

/**
 * Projects component
 *
 * Renders a grid of project thumbnails with hover effects.
 * Each project links to its Behance portfolio page.
 *
 * @returns Projects section element
 */
export const Projects = () => {
  const { t } = useTranslation()

  return (
    <section
      id="projects"
      className="section bg-[var(--color-dark)]"
      aria-label="Projects section"
    >
      <div className="w-full max-w-[1600px] px-10 mx-auto">
        {/* Section Title */}
        <h2>{t('projects.title')}</h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => {
            const title = t(`projects.items.${project.key}`, project.key)
            const animationDelay = index * ANIMATION_DELAY_MULTIPLIER

            return (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View project: ${title}`}
                className="group relative aspect-[16/9] overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg"
                style={{ transitionDelay: `${animationDelay}ms` }}
              >
                {/* Project Image - Desktop and Mobile */}
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
                    className="w-full h-full object-cover transform will-change-transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-1"
                  />
                </picture>

                {/* Overlay on Hover */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-80 transition-opacity duration-300 ease-in-out will-change-opacity"
                  aria-hidden="true"
                />

                {/* Project Title on Hover */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out will-change-opacity"
                  aria-hidden="true"
                >
                  <span className="px-5 py-2 text-lg font-semibold text-white bg-black bg-opacity-60 rounded-lg shadow-sm text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-in-out will-change-transform">
                    {title}
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
