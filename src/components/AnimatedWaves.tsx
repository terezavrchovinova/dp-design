import React from 'react'

const AnimatedWaves: React.FC = () => {
  return (
    <div className="w-full overflow-hidden -mt-60">
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 20 180 30"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s58 18 88 18 
               58-18 88-18 58 18 88 18v44h-352z"
          />
          <filter id="blur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
          </filter>
        </defs>

        <g className="parallax" filter="url(#blur)">
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(255, 99, 71, 0.7)"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="20 0"
              dur="8s"
              repeatCount="indefinite"
            />
          </use>
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="2"
            fill="rgba(220, 20, 60, 0.6)"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="-15 0"
              dur="10s"
              repeatCount="indefinite"
            />
          </use>
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="4"
            fill="rgba(255, 69, 0, 0.5)"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="10 0"
              dur="12s"
              repeatCount="indefinite"
            />
          </use>
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="6"
            fill="rgba(178, 34, 34, 0.4)"
          >
            <animateTransform
              attributeName="transform"
              type="translate"
              from="0 0"
              to="-20 0"
              dur="14s"
              repeatCount="indefinite"
            />
          </use>
        </g>
      </svg>
    </div>
  )
}

export default AnimatedWaves
