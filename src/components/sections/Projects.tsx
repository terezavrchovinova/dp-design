import { RevealOnScroll } from '../RevealOnScroll'

const projects = [
  {
    id: 1,
    title: 'Brand Identity - Kynez',
    image: '/projects/kynez.jpg',
    link: 'https://www.behance.net/gallery/166029959/Kynez-Sportswear-brand-identity',
  },
  {
    id: 2,
    title: 'Saleskit Design',
    image: '/projects/saleskit.jpg',
    link: 'https://www.behance.net/gallery/161063437/Design-for-Saleskit',
  },
  {
    id: 3,
    title: 'Firemní identita — Yogovna',
    image: '/projects/yogovna.jpg',
    link: 'https://www.behance.net/gallery/158547107/Firemni-identita-Yogovna',
  },
  {
    id: 4,
    title: 'Typographic Poster Experiments',
    image: '/projects/typoposters.jpg',
    link: 'https://www.behance.net/gallery/150682285/Typographic-poster-experiments',
  },
  {
    id: 5,
    title: 'Summer Posters — Graphic Series',
    image: '/projects/summerposters.jpg',
    link: 'https://www.behance.net/gallery/144064025/Summer-Posters',
  },
  {
    id: 6,
    title: 'Visual Identity — Hory Doly',
    image: '/projects/horydoly.jpg',
    link: 'https://www.behance.net/gallery/144063919/Visual-Identity-Hory-Doly',
  },
]

export const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 w-full">
          <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transform transition duration-300 group-hover:scale-105 group-hover:brightness-50"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <span className="text-white text-lg font-medium bg-black bg-opacity-60 px-4 py-2 rounded">
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
