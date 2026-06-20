import { useEffect, useRef } from 'react'

/**
 * A parsed Lottie animation JSON document. The lottie-web typings expose this as
 * `unknown`; we narrow it to an object map, which every imported `.json` asset
 * satisfies and which is more honest than `unknown`.
 */
export type LottieAnimationData = Record<string, unknown>

interface LottieProps {
  animationData: LottieAnimationData
  loop?: boolean
  autoplay?: boolean
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
  className,
  style,
}: LottieProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    let animation: { destroy: () => void } | undefined

    import('lottie-web/build/player/lottie_light').then((mod) => {
      if (cancelled || !containerRef.current) {
        return
      }
      animation = mod.default.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop,
        autoplay,
        animationData,
      })
    })

    return () => {
      cancelled = true
      animation?.destroy()
    }
  }, [animationData, loop, autoplay])

  return <div ref={containerRef} className={className} style={style} />
}
