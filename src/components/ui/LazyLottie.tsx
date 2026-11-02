import { useEffect, useRef } from 'react'

/**
 * A parsed Lottie animation JSON document. The lottie-web typings expose this as
 * `unknown`; we narrow it to an object map, which every imported `.json` asset
 * satisfies and which is more honest than `unknown`.
 */
export type LottieAnimationData = Record<string, unknown>

/** The subset of lottie-web's AnimationItem this component drives. */
interface LottieInstance {
  destroy: () => void
  play: () => void
  pause: () => void
}

interface LottieProps {
  animationData: LottieAnimationData
  loop?: boolean
  autoplay?: boolean
  /**
   * Controlled playback: when set, the animation ignores `autoplay` and plays
   * only while `playing` is true (e.g. on row hover), pausing otherwise.
   */
  playing?: boolean
  className?: string
  style?: React.CSSProperties
}

/**
 * Renders a Lottie animation using the lightweight `lottie_light` player
 * (no expression/effects engine — our icon assets use neither), loaded lazily
 * so the player code stays out of the main bundle and is only fetched once this
 * component mounts.
 */
export const LazyLottie = ({
  animationData,
  loop = true,
  autoplay = true,
  playing,
  className,
  style,
}: LottieProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<LottieInstance | null>(null)
  // Mirrors `playing` so the async load callback applies the latest hover state.
  const playingRef = useRef(playing)
  playingRef.current = playing
  const isControlled = playing !== undefined

  useEffect(() => {
    let cancelled = false
    let animation: LottieInstance | undefined

    // Looping icon animations are ambient motion — render the first frame only
    // for users whose OS asks for reduced motion.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    import('lottie-web/build/player/lottie_light').then((mod) => {
      if (cancelled || !containerRef.current) {
        return
      }
      animation = mod.default.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop,
        autoplay: !isControlled && autoplay && !reduceMotion,
        animationData,
      })
      animationRef.current = animation
      if (playingRef.current && !reduceMotion) {
        animation.play()
      }
    })

    return () => {
      cancelled = true
      animationRef.current = null
      animation?.destroy()
    }
  }, [animationData, loop, autoplay, isControlled])

  useEffect(() => {
    const animation = animationRef.current
    if (playing === undefined || !animation) {
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    if (playing) {
      animation.play()
    } else {
      animation.pause()
    }
  }, [playing])

  return <div ref={containerRef} className={className} style={style} />
}
