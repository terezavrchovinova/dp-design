import { useInView } from 'motion/react'
import { useRef } from 'react'

type UseInViewOptions = NonNullable<Parameters<typeof useInView>[1]>

/**
 * Thin wrapper around motion's `useInView` that fires once and stays true.
 * Owns the element ref so callers don't repeat the `useRef` boilerplate.
 * Used for one-shot entrance animations so elements don't re-animate on scroll.
 */
export function useInViewOnce<T extends Element>(options?: Omit<UseInViewOptions, 'once'>) {
  const ref = useRef<T>(null)
  const isInView = useInView(ref, { once: true, ...options })
  return [ref, isInView] as const
}
