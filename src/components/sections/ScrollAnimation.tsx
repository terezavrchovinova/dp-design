import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { buildChaosPath, clamp, ease, lerp } from '../../utils/scrollAnimationPath'

export const ScrollAnimation = () => {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const chaosPathRef = useRef<SVGPathElement>(null)
  const cleanPathRef = useRef<SVGPathElement>(null)
  const endDotRef = useRef<SVGCircleElement>(null)
  const endGlowRef = useRef<SVGCircleElement>(null)
  const glowOverlayRef = useRef<HTMLDivElement>(null)
  const cleanLenRef = useRef(0)

  const [phaseLabel, setPhaseLabel] = useState(t('animation.phase1'))
  const [phaseColor, setPhaseColor] = useState('#ffffff')
  const [subLabel, setSubLabel] = useState(t('animation.sub1'))
  const [subColor, setSubColor] = useState('#8c8c8c')
  const [subOpacity, setSubOpacity] = useState(1)

  useEffect(() => {
    const chaosPath = chaosPathRef.current
    const cleanPath = cleanPathRef.current
    const endDot = endDotRef.current
    const endGlow = endGlowRef.current
    const glowOverlay = glowOverlayRef.current
    const section = sectionRef.current

    if (!chaosPath || !cleanPath || !endDot || !endGlow || !glowOverlay || !section) return

    cleanLenRef.current = cleanPath.getTotalLength()
    cleanPath.style.strokeDasharray = String(cleanLenRef.current)
    cleanPath.style.strokeDashoffset = String(cleanLenRef.current)
    chaosPath.setAttribute('d', buildChaosPath(0))
  }, [])

  useEffect(() => {
    setPhaseLabel(t('animation.phase1'))
    setSubLabel(t('animation.sub1'))
  }, [t])

  useEffect(() => {
    const chaosPath = chaosPathRef.current
    const cleanPath = cleanPathRef.current
    const endDot = endDotRef.current
    const endGlow = endGlowRef.current
    const glowOverlay = glowOverlayRef.current
    const section = sectionRef.current

    if (!chaosPath || !cleanPath || !endDot || !endGlow || !glowOverlay || !section) return

    const cleanLen = cleanLenRef.current

    const update = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const p = clamp(scrolled / scrollable, 0, 1)

      const PHASE2_START = 0.35

      if (p < PHASE2_START) {
        const tVal = ease(p / PHASE2_START)
        chaosPath.setAttribute('d', buildChaosPath(tVal))
        chaosPath.style.opacity = '1'
        chaosPath.style.stroke = '#3a3a3a'

        cleanPath.style.strokeDashoffset = String(cleanLen)
        cleanPath.style.opacity = '0'
        endDot.setAttribute('r', '0')
        endGlow.setAttribute('r', '0')
        glowOverlay.style.opacity = '0'

        if (p < 0.15) {
          setPhaseLabel(t('animation.phase1'))
          setPhaseColor('#ffffff')
          setSubLabel(t('animation.sub1'))
          setSubColor('#8c8c8c')
          setSubOpacity(1)
        } else {
          setPhaseLabel(t('animation.phase2'))
          setPhaseColor('#a0a0a0')
          setSubLabel(t('animation.sub2'))
          setSubColor('#7a7a7a')
          setSubOpacity(1)
        }
      } else {
        chaosPath.setAttribute('d', buildChaosPath(1))
        const fadeChaos = ease(clamp((p - PHASE2_START) / 0.15, 0, 1))
        chaosPath.style.opacity = String(lerp(1, 0.08, fadeChaos))

        const drawT = ease(clamp((p - 0.4) / 0.35, 0, 1))
        cleanPath.style.strokeDashoffset = String(cleanLen * (1 - drawT))
        cleanPath.style.opacity = String(lerp(0, 1, ease(clamp((p - PHASE2_START) / 0.08, 0, 1))))

        if (drawT > 0.88) {
          const dotT = (drawT - 0.88) / 0.12
          endDot.setAttribute('r', String(lerp(0, 5, dotT)))
          endGlow.setAttribute('r', String(lerp(0, 18, dotT)))
        } else {
          endDot.setAttribute('r', '0')
          endGlow.setAttribute('r', '0')
        }

        glowOverlay.style.opacity = String(lerp(0, 1, ease(clamp((p - 0.55) / 0.15, 0, 1))))

        setPhaseLabel(t('animation.phase3'))
        setPhaseColor('#FF6B2B')
        setSubLabel(t('animation.sub3'))
        setSubColor('#FF6B2B')
        setSubOpacity(drawT)
      }
    }

    // Coalesce scroll events to one DOM update per animation frame.
    let rafId = 0
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      rafId = requestAnimationFrame(() => {
        ticking = false
        update()
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [t])

  return (
    <section
      ref={sectionRef}
      id="scroll-animation"
      className="scroll-anim-section"
      aria-hidden="true"
    >
      <div className="scroll-anim-sticky">
        <div ref={glowOverlayRef} className="scroll-anim-glow" />

        <div className="scroll-anim-content">
          <div className="scroll-anim-phase-label" style={{ color: phaseColor }}>
            {phaseLabel}
          </div>

          <div className="scroll-anim-svg-wrap">
            <svg className="scroll-anim-svg" viewBox="0 0 860 180" aria-hidden="true">
              <path
                ref={chaosPathRef}
                fill="none"
                stroke="#3a3a3a"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d={buildChaosPath(0)}
              />
              <path
                ref={cleanPathRef}
                fill="none"
                stroke="#FF6B2B"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M 40 90 C 280 90 580 90 820 90"
              />
              <circle ref={endGlowRef} cx="820" cy="90" r="0" fill="rgba(255,107,43,0.2)" />
              <circle ref={endDotRef} cx="820" cy="90" r="0" fill="#FF6B2B" />
            </svg>
          </div>

          <div className="scroll-anim-sub-label" style={{ color: subColor, opacity: subOpacity }}>
            {subLabel}
          </div>
        </div>
      </div>
    </section>
  )
}
