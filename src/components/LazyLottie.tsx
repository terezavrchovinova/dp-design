import { lazy, Suspense } from 'react'

const LottieLazy = lazy(() =>
  import('lottie-react').then((module) => ({
    // lottie-react is CommonJS; bundler interop may nest the component under
    // `default.default` (Vite 8+) or expose it directly as `default` (Vite 7).
    default:
      (module.default as typeof module.default & { default?: typeof module.default }).default ??
      module.default,
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
