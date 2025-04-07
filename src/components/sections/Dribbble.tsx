import React, { useEffect, useState } from 'react'
import type { DribbbleShot } from '../../types/dribbble'

const DribbbleShots: React.FC = () => {
  const [shots, setShots] = useState<DribbbleShot[]>([])

  useEffect(() => {
    fetch('/api/dribbble')
      .then((res) => res.json())
      .then((data) => setShots(data))
      .catch((err) => console.error('Failed to fetch Dribbble shots:', err))
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {shots.map((shot) => (
        <a
          key={shot.id}
          href={shot.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={shot.images.normal}
            alt={shot.title}
            className="rounded-lg shadow-md transition-transform hover:scale-105"
          />
        </a>
      ))}
    </div>
  )
}

export default DribbbleShots
