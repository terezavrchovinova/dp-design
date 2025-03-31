// AnimatedWaves.tsx
import React from 'react'
import Wavify from 'react-wavify'

const AnimatedWaves: React.FC = () => {
  return (
    <div className="w-full h-48 overflow-hidden">
      <Wavify
        fill="url(#fireGradient)"
        paused={false}
        options={{
          height: 5,
          amplitude: 40,
          speed: 0.1,
          points: 5,
        }}
      >
        <defs>
          <linearGradient id="fireGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff9600" />
            <stop offset="25%" stopColor="#ff7a00" />
            <stop offset="50%" stopColor="#ff5a00" />
            <stop offset="75%" stopColor="#cc2b00" />
            <stop offset="100%" stopColor="#991a00" />
          </linearGradient>
        </defs>
      </Wavify>
    </div>
  )
}

export default AnimatedWaves
