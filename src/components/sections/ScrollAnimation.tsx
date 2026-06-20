import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  buildChaosPath,
  CHAOS_STROKE,
  CLEAN_PATH_D,
  computeScrollPhase,
  END_POINT,
  type PhaseLabelKey,
  type SubLabelKey,
  SVG_VIEWBOX,
} from '@/utils/scrollAnimationPath'

/** The label/colour values that are driven through React state (the rest are applied to the DOM directly). */
interface LabelState {
  labelKey: PhaseLabelKey
  subKey: SubLabelKey
  phaseColor: string
  subColor: string
  subOpacity: number
}

// Derive the initial state from the phase maths at progress 0 so it can never
// drift out of sync with what the first scroll frame would render.
const { labelKey, subKey, phaseColor, subColor, subOpacity } = computeScrollPhase(0)
const INITIAL_LABELS: LabelState = { labelKey, subKey, phaseColor, subColor, subOpacity }

const labelsEqual = (a: LabelState, b: LabelState) =>
  a.labelKey === b.labelKey &&
  a.subKey === b.subKey &&
  a.phaseColor === b.phaseColor &&
  a.subColor === b.subColor &&
  a.subOpacity === b.subOpacity

export const ScrollAnimation = () => {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const chaosPathRef = useRef<SVGPathElement>(null)
  const cleanPathRef = useRef<SVGPathElement>(null)
  const endDotRef = useRef<SVGCircleElement>(null)
  const endGlowRef = useRef<SVGCircleElement>(null)
  const glowOverlayRef = useRef<HTMLDivElement>(null)

  const [labels, setLabels] = useState<LabelState>(INITIAL_LABELS)

  useEffect(() => {
    const chaosPath = chaosPathRef.current
    const cleanPath = cleanPathRef.current
    const endDot = endDotRef.current
    const endGlow = endGlowRef.current
    const glowOverlay = glowOverlayRef.current
    const section = sectionRef.current

    if (!chaosPath || !cleanPath || !endDot || !endGlow || !glowOverlay || !section) return

    const cleanLen = cleanPath.getTotalLength()
    cleanPath.style.strokeDasharray = String(cleanLen)
    cleanPath.style.strokeDashoffset = String(cleanLen)
    chaosPath.setAttribute('d', buildChaosPath(0))

    const update = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      const progress = scrollable > 0 ? -rect.top / scrollable : 0
      const phase = computeScrollPhase(progress)

      chaosPath.setAttribute('d', phase.chaosPath)
      chaosPath.style.opacity = String(phase.chaosOpacity)
      chaosPath.style.stroke = phase.chaosStroke

      cleanPath.style.strokeDashoffset = String(cleanLen * (1 - phase.cleanDrawProgress))
      cleanPath.style.opacity = String(phase.cleanOpacity)

      endDot.setAttribute('r', String(phase.dotRadius))
      endGlow.setAttribute('r', String(phase.glowRadius))
      glowOverlay.style.opacity = String(phase.glowOverlayOpacity)

      const next: LabelState = {
        labelKey: phase.labelKey,
        subKey: phase.subKey,
        phaseColor: phase.phaseColor,
        subColor: phase.subColor,
        subOpacity: phase.subOpacity,
      }
      // Skip the re-render entirely when nothing the UI shows has changed.
      setLabels((prev) => (labelsEqual(prev, next) ? prev : next))
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
  }, [])

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
          <div className="scroll-anim-phase-label" style={{ color: labels.phaseColor }}>
            {t(`animation.${labels.labelKey}`)}
          </div>

          <div className="scroll-anim-svg-wrap">
            <svg className="scroll-anim-svg" viewBox={SVG_VIEWBOX} aria-hidden="true">
              <path
                ref={chaosPathRef}
                fill="none"
                stroke={CHAOS_STROKE}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d={buildChaosPath(0)}
              />
              <path
                ref={cleanPathRef}
                className="stroke-accent"
                fill="none"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                d={CLEAN_PATH_D}
              />
              <circle
                ref={endGlowRef}
                className="fill-accent/20"
                cx={END_POINT.x}
                cy={END_POINT.y}
                r="0"
              />
              <circle
                ref={endDotRef}
                className="fill-accent"
                cx={END_POINT.x}
                cy={END_POINT.y}
                r="0"
              />
            </svg>
          </div>

          <div
            className="scroll-anim-sub-label"
            style={{ color: labels.subColor, opacity: labels.subOpacity }}
          >
            {t(`animation.${labels.subKey}`)}
          </div>
        </div>
      </div>
    </section>
  )
}
