import { lazy, Suspense } from 'react'

const LottieLazy = lazy(() =>
  import('lottie-react').then((module) => ({
    default: module.default,
  }))
)

/**
 * A parsed Lottie animation JSON document. lottie-react itself types this as
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

export const LazyLottie = (props: LottieProps) => {
  return (
    <Suspense
      fallback={
        <div
          className={props.className}
          style={props.style}
          role="status"
          aria-label="Loading animation"
        />
      }
    >
      <LottieLazy {...props} />
    </Suspense>
  )
}
