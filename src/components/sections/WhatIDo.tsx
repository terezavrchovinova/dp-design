// WhatIDo.tsx
import { RevealOnScroll } from '../RevealOnScroll'

const services = [
  {
    title: 'Visual & Brand Design',
    description:
      'Logos, brand identities, brochures, packaging, and merchandising — cohesive visuals delivered with clarity, consistency, and elegance.',
    img: '/src/assets/icons/visual-brand-design.png',
  },
  {
    title: 'Video & Motion',
    description:
      'Production and editing of promotional videos, commercial spots, and motion graphics that bring energy and depth to your brand’s message.',
    img: '/src/assets/icons/video.png',
  },
  {
    title: 'Digital Content Creation',
    description:
      'Online graphics and assets for web and social media — designed with purpose, precision, and visual impact in mind.',
    img: '/src/assets/icons/social-media.png',
  },
  {
    title: 'Photography',
    description:
      'Branded photography that captures products, lifestyle moments, and atmospheres — always aligned with your visual identity.',
    img: '/src/assets/icons/camera.png',
  },
]

export const WhatIDo = () => {
  return (
    <RevealOnScroll>
      <section
        id="what-i-do"
        className="min-h-screen flex items-center justify-center py-20 px-4 bg-black"
      >
        <div className="max-w-6xl w-full space-y-6" data-reveal-child>
          <h2 className="h2-style" data-reveal-child>
            What I Do
          </h2>

          {/* Zúžený grid wrapper */}
          <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center gap-6 p-6 bg-gradient-to-r from-gray-200 via-indigo-200 to-purple-200 to-pink-700 rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="shrink-0 w-16">
                  <img
                    src={service.img}
                    alt={`${service.title} icon`}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div className="w-full max-w-[500px] self-center">
                  <h3 className="h3-style text-left">{service.title}</h3>
                  <p className="text-sm text-gray-700">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealOnScroll>
  )
}
