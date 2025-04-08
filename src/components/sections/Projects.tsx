import { useTranslation } from 'react-i18next'

import kynezImg from '../../assets/project_thumbnails/1024x576/kynez.jpg'
import saleskitImg from '../../assets/project_thumbnails/1024x576/saleskit.jpg'
import ditaImg from '../../assets/project_thumbnails/1024x576/dita.jpg'
import maastrichtImg from '../../assets/project_thumbnails/1024x576/maastricht.jpg'
import letItRollImg from '../../assets/project_thumbnails/1024x576/let_it_roll.jpg'
import newtoniaImg from '../../assets/project_thumbnails/1024x576/newtonia.jpg'
import brejchaImg from '../../assets/project_thumbnails/1024x576/brejcha.jpg'
import renaissanceImg from '../../assets/project_thumbnails/1024x576/mona_lisa.jpg'
import deathvalleyImg from '../../assets/project_thumbnails/1024x576/death_valley.jpg'
import jurassicImg from '../../assets/project_thumbnails/1024x576/jurassic_adventure.jpg'

const projects = [
  {
    id: 1,
    key: 'kynez',
    image: kynezImg,
    link: 'https://www.behance.net/gallery/222330047/Kynez-Sportswear-brand-identity',
  },
  {
    id: 2,
    key: 'saleskit',
    image: saleskitImg,
    link: 'https://www.behance.net/gallery/219839403/Design-for-Saleskit',
  },
  {
    id: 3,
    key: 'dita',
    image: ditaImg,
    link: 'https://www.behance.net/gallery/205350295/Dita-Von-Teese-visual',
  },
  {
    id: 4,
    key: 'maastricht',
    image: maastrichtImg,
    link: 'https://www.behance.net/gallery/199767453/Maastricht-Festival-Visual',
  },
  {
    id: 5,
    key: 'letitroll',
    image: letItRollImg,
    link: 'https://www.behance.net/gallery/196798719/Let-It-Roll-Festival-poster',
  },
  {
    id: 6,
    key: 'newtonia',
    image: newtoniaImg,
    link: 'https://www.behance.net/gallery/201179759/Game-designNewtonia',
  },
  {
    id: 7,
    key: 'brejcha',
    image: brejchaImg,
    link: 'https://www.behance.net/gallery/189009581/Boris-Brejcha-video-spot',
  },
  {
    id: 8,
    key: 'renaissance',
    image: renaissanceImg,
    link: 'https://www.behance.net/gallery/207746525/The-Great-Masters-of-the-Renaissance-video-spot',
  },
  {
    id: 9,
    key: 'deathvalley',
    image: deathvalleyImg,
    link: 'https://www.behance.net/gallery/200322649/Death-Valley-design',
  },
  {
    id: 10,
    key: 'jurassic',
    image: jurassicImg,
    link: 'https://www.behance.net/gallery/188776307/brochure-Jurassic-Adventure',
  },
]

export const Projects = () => {
  const { t } = useTranslation()

  return (
    <section id="projects" className="section bg-[var(--color-dark)]">
      <div className="container-content max-w-7xl">
        <h2>{t('projects.title')}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const title = t(`projects.items.${project.key}`, project.key)

            return (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open project: ${title}`}
                className="group relative aspect-[16/9] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 ease-out translate-y-6"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <img
                  src={project.image}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover hover-zoom"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                  <span className="px-6 py-3 text-lg font-medium text-[var(--color-white)] bg-[var(--color-surface)]/70 rounded-xl shadow-md text-center">
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
