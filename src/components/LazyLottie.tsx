import { lazy, Suspense } from 'react'

/**
 * Dynamically imported Lottie component
 * This reduces initial bundle size by loading lottie-react only when needed
 */
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

/**
 * LazyLottie component
 *
 * Wrapper around lottie-react that loads the library dynamically.
 * This reduces the initial bundle size by ~50KB.
 *
 * @param props - Lottie component props
 * @returns Lottie animation with loading fallback
 */
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
