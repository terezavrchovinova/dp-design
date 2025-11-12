import { useTranslation } from 'react-i18next'

// Project assets
import kynezImg from '../../assets/project_thumbnails/kynez.webp'
import variousBannersImg from '../../assets/project_thumbnails/various_banners.webp'
import saleskitImg from '../../assets/project_thumbnails/saleskit.webp'
import ditaImg from '../../assets/project_thumbnails/dita.webp'
import maastrichtImg from '../../assets/project_thumbnails/maastricht.webp'
import letItRollImg from '../../assets/project_thumbnails/let_it_roll.webp'
import newtoniaImg from '../../assets/project_thumbnails/newtonia.webp'
import brejchaImg from '../../assets/project_thumbnails/brejcha.webp'
import renaissanceImg from '../../assets/project_thumbnails/mona_lisa.webp'
import deathvalleyImg from '../../assets/project_thumbnails/death_valley.webp'
import jurassicImg from '../../assets/project_thumbnails/jurassic_adventure.webp'

// Types
interface Project {
  id: number
  key: string
  image: string
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
    image: kynezImg,
    link: 'https://www.behance.net/gallery/222330047/Kynez-Sportswear-brand-identity',
  },
  {
    id: 2,
    key: 'various_banners',
    image: variousBannersImg,
    link: 'https://www.behance.net/gallery/223131257/Banner-Designs-Event-Exhibition-Series',
  },
  {
    id: 3,
    key: 'maastricht',
    image: maastrichtImg,
    link: 'https://www.behance.net/gallery/199767453/Maastricht-Festival-Visual',
  },
  {
    id: 4,
    key: 'saleskit',
    image: saleskitImg,
    link: 'https://www.behance.net/gallery/219839403/Design-for-Saleskit',
  },
  {
    id: 5,
    key: 'dita',
    image: ditaImg,
    link: 'https://www.behance.net/gallery/205350295/Dita-Von-Teese-visual',
  },
  {
    id: 6,
    key: 'letitroll',
    image: letItRollImg,
    link: 'https://www.behance.net/gallery/196798719/Let-It-Roll-Festival-poster',
  },
  {
    id: 7,
    key: 'newtonia',
    image: newtoniaImg,
    link: 'https://www.behance.net/gallery/201179759/Game-designNewtonia',
  },
  {
    id: 8,
    key: 'brejcha',
    image: brejchaImg,
    link: 'https://www.behance.net/gallery/189009581/Boris-Brejcha-video-spot',
  },
  {
    id: 9,
    key: 'renaissance',
    image: renaissanceImg,
    link: 'https://www.behance.net/gallery/207746525/The-Great-Masters-of-the-Renaissance-video-spot',
  },
  {
    id: 10,
    key: 'deathvalley',
    image: deathvalleyImg,
    link: 'https://www.behance.net/gallery/200322649/Death-Valley-design',
  },
  {
    id: 11,
    key: 'jurassic',
    image: jurassicImg,
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
                {/* Project Image */}
                <img
                  src={project.image}
                  alt={title}
                  loading="lazy"
                  width={800}
                  height={450}
                  decoding="async"
                  className="w-full h-full object-cover transform will-change-transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-1"
                />

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
