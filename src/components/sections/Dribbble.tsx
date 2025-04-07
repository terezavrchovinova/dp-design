import { useEffect, useState } from 'react'

type DribbbleShot = {
  id: number
  title: string
  html_url: string
  images: {
    normal: string
    hidpi?: string
    teaser?: string
  }
}

export default function Dribbble() {
  const [shots, setShots] = useState<DribbbleShot[]>([])

  useEffect(() => {
    fetch('/api/dribbble')
      .then((res) => res.json())
      .then((data: DribbbleShot[]) => setShots(data))
      .catch(console.error)
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {shots.map((shot) => (
        <a
          key={shot.id}
          href={shot.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform transform hover:scale-105"
        >
          <img
            src={shot.images.normal}
            alt={shot.title}
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </a>
      ))}
    </div>
  )
}
