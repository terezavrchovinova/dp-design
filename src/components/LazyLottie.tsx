import { lazy, Suspense } from 'react'

const LottieLazy = lazy(() =>
  import('lottie-react').then((module) => ({
    default: module.default,
  }))
)

interface LottieProps {
  animationData: unknown
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
