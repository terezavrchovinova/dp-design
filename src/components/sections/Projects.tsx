import { RevealOnScroll } from '../RevealOnScroll'

const projects = [
  {
    id: 1,
    title: 'Brand Identity - Kynez',
    image: 'src/assets/project_thumbnails/1024x576/kynez.jpg',
    link: 'https://www.behance.net/gallery/222330047/Kynez-Sportswear-brand-identity',
  },
  {
    id: 2,
    title: 'Design - Saleskit',
    image: 'src/assets/project_thumbnails/1024x576/saleskit.jpg',
    link: 'https://www.behance.net/gallery/219839403/Design-for-Saleskit',
  },
  {
    id: 3,
    title: 'Visual - Dita Von Teese',
    image: 'src/assets/project_thumbnails/1024x576/dita.jpg',
    link: 'https://www.behance.net/gallery/205350295/Dita-Von-Teese-visual',
  },
  {
    id: 4,
    title: 'Visual - Maastricht festival',
    image: 'src/assets/project_thumbnails/1024x576/maastricht.jpg',
    link: 'https://www.behance.net/gallery/199767453/Maastricht-Festival-Visual',
  },
  {
    id: 5,
    title: 'Poster - Let It Roll',
    image: 'src/assets/project_thumbnails/1024x576/let_it_roll.jpg',
    link: 'https://www.behance.net/gallery/196798719/Let-It-Roll-Festival-poster',
  },
  {
    id: 6,
    title: 'Game Design - Newtonia',
    image: 'src/assets/project_thumbnails/1024x576/newtonia.jpg',
    link: 'https://www.behance.net/gallery/201179759/Game-designNewtonia',
  },
  {
    id: 7,
    title: 'Video Spot - Boris Brejcha',
    image: 'src/assets/project_thumbnails/1024x576/brejcha.jpg',
    link: 'https://www.behance.net/gallery/189009581/Boris-Brejcha-video-spot',
  },
  {
    id: 8,
    title: 'Video Spot - The Great Masters of the Renaissance',
    image: 'src/assets/project_thumbnails/1024x576/mona_lisa.jpg',
    link: 'https://www.behance.net/gallery/207746525/The-Great-Masters-of-the-Renaissance-video-spot',
  },
  {
    id: 9,
    title: 'Digital Art - Death Valley',
    image: 'src/assets/project_thumbnails/1024x576/death_valley.jpg',
    link: 'https://www.behance.net/gallery/200322649/Death-Valley-design',
  },
  {
    id: 10,
    title: 'Brochure - Jurassic Adventure',
    image: 'src/assets/project_thumbnails/1024x576/jurassic_adventure.jpg',
    link: 'https://www.behance.net/gallery/188776307/brochure-Jurassic-Adventure',
  },
]

export const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto px-4 w-full">
          <h2 className="h2-style" data-reveal-child>
            Projects
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500 aspect-[16/9] opacity-0 translate-y-6 transition-all duration-700"
                style={{ transitionDelay: `${index * 100}ms` }}
                data-reveal-child
                aria-label={`Open project: ${project.title}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-medium bg-black/60 px-6 py-3 rounded-lg text-center">
                    {project.title}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
