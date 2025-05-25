import { useTranslation } from 'react-i18next'

import kynezImg from '../../assets/project_thumbnails/kynez.webp'
import saleskitImg from '../../assets/project_thumbnails/saleskit.webp'
import ditaImg from '../../assets/project_thumbnails/dita.webp'
import maastrichtImg from '../../assets/project_thumbnails/maastricht.webp'
import letItRollImg from '../../assets/project_thumbnails/let_it_roll.webp'
import newtoniaImg from '../../assets/project_thumbnails/newtonia.webp'
import brejchaImg from '../../assets/project_thumbnails/brejcha.webp'
import renaissanceImg from '../../assets/project_thumbnails/mona_lisa.webp'
import deathvalleyImg from '../../assets/project_thumbnails/death_valley.webp'
import jurassicImg from '../../assets/project_thumbnails/jurassic_adventure.webp'

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
      <div className="w-full max-w-[1600px] px-10 mx-auto">
        <h2>{t('projects.title')}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const title = t(`projects.items.${project.key}`, project.key)

            return (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open project: ${title}`}
                className="group relative aspect-[16/9] overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <img
                  src={project.image}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover transform will-change-transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-1"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-80 transition-opacity duration-300 ease-in-out will-change-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out will-change-opacity">
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
