// WhatIDo.tsx
import { RevealOnScroll } from '../RevealOnScroll'

const services = [
  {
    title: 'Graphic Design',
    description:
      'Logos, branding, brochures, merchandising, and outdoor campaigns',
    img: '/src/assets/icons/graphic-design.svg',
  },
  {
    title: 'Video Editing & Motion Graphics',
    description: 'Promo videos, TV commercials, post-production, animation',
  },
  {
    title: 'Digital & Social Media Assets',
    description: 'HTML5 banners, PPC ads, infographics, social content visuals',
  },
  {
    title: 'DTP',
    description: 'Print and packaging',
  },
]

export const WhatIDo = () => {
  return (
    <RevealOnScroll>
      <section
        id="what-i-do"
        className="min-h-screen flex items-center justify-center py-20"
      >
        <div className="space-y-6" data-reveal-child>
          <h2
            className="text-4xl font-extrabold mb-14 text-center bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent opacity-0 translate-y-6 transition-all duration-700"
            data-reveal-child
          >
            What I Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="border rounded-2xl shadow-md p-6 text-left hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-white">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealOnScroll>
  )
}
