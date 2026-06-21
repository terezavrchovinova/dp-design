import { useInView } from 'motion/react'

type UseInViewOptions = NonNullable<Parameters<typeof useInView>[1]>

/**
 * Thin wrapper around motion's `useInView` that fires once and stays true.
 * Used for one-shot entrance animations so elements don't re-animate on scroll.
 */
export function useInViewOnce(
  ref: Parameters<typeof useInView>[0],
  options?: Omit<UseInViewOptions, 'once'>
) {
  return useInView(ref, { once: true, ...options })
}
