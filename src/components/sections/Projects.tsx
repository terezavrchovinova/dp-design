import { useTranslation } from 'react-i18next'

const projects = [
  {
    id: 1,
    key: 'kynez',
    image: 'src/assets/project_thumbnails/1024x576/kynez.jpg',
    link: 'https://www.behance.net/gallery/222330047/Kynez-Sportswear-brand-identity',
  },
  {
    id: 2,
    key: 'saleskit',
    image: 'src/assets/project_thumbnails/1024x576/saleskit.jpg',
    link: 'https://www.behance.net/gallery/219839403/Design-for-Saleskit',
  },
  {
    id: 3,
    key: 'dita',
    image: 'src/assets/project_thumbnails/1024x576/dita.jpg',
    link: 'https://www.behance.net/gallery/205350295/Dita-Von-Teese-visual',
  },
  {
    id: 4,
    key: 'maastricht',
    image: 'src/assets/project_thumbnails/1024x576/maastricht.jpg',
    link: 'https://www.behance.net/gallery/199767453/Maastricht-Festival-Visual',
  },
  {
    id: 5,
    key: 'letitroll',
    image: 'src/assets/project_thumbnails/1024x576/let_it_roll.jpg',
    link: 'https://www.behance.net/gallery/196798719/Let-It-Roll-Festival-poster',
  },
  {
    id: 6,
    key: 'newtonia',
    image: 'src/assets/project_thumbnails/1024x576/newtonia.jpg',
    link: 'https://www.behance.net/gallery/201179759/Game-designNewtonia',
  },
  {
    id: 7,
    key: 'brejcha',
    image: 'src/assets/project_thumbnails/1024x576/brejcha.jpg',
    link: 'https://www.behance.net/gallery/189009581/Boris-Brejcha-video-spot',
  },
  {
    id: 8,
    key: 'renaissance',
    image: 'src/assets/project_thumbnails/1024x576/mona_lisa.jpg',
    link: 'https://www.behance.net/gallery/207746525/The-Great-Masters-of-the-Renaissance-video-spot',
  },
  {
    id: 9,
    key: 'deathvalley',
    image: 'src/assets/project_thumbnails/1024x576/death_valley.jpg',
    link: 'https://www.behance.net/gallery/200322649/Death-Valley-design',
  },
  {
    id: 10,
    key: 'jurassic',
    image: 'src/assets/project_thumbnails/1024x576/jurassic_adventure.jpg',
    link: 'https://www.behance.net/gallery/188776307/brochure-Jurassic-Adventure',
  },
]

export const Projects = () => {
  const { t } = useTranslation()

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="max-w-8xl mx-auto px-4 w-full">
        <h2>{t('projects.title')}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl duration-500 aspect-[16/9] translate-y-6 transition-all"
              style={{ transitionDelay: `${index * 100}ms` }}
              data-reveal-child
              aria-label={`Open project: ${t(`projects.items.${project.key}`)}`}
            >
              <img
                src={project.image}
                alt={t(`projects.items.${project.key}`)}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-medium bg-black/60 px-6 py-3 rounded-lg text-center">
                  {t(`projects.items.${project.key}`)}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
