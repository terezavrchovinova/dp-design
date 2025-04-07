import React, { useEffect, useState } from 'react'

interface DribbbleShot {
  id: number
  title: string
  html_url: string
  images: {
    normal: string
    hidpi?: string
    teaser?: string
  }
}

const Dribbble: React.FC = () => {
  const [shots, setShots] = useState<DribbbleShot[]>([])

  useEffect(() => {
    fetch('/api/dribbble')
      .then((res) => res.json())
      .then((data) => setShots(data))
      .catch((err) => console.error('Error fetching Dribbble shots:', err))
  }, [])

  return (
    <section id="dribbble" className="p-6">
      <h2 className="text-2xl font-bold mb-4">Latest Dribbble Shots</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {shots.map((shot) => (
          <a
            key={shot.id}
            href={shot.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src={shot.images.normal}
              alt={shot.title}
              className="rounded-lg shadow-md hover:scale-105 transition-transform"
            />
          </a>
        ))}
      </div>
    </section>
  )
}

export default Dribbble
