import type { TargetAndTransition } from 'motion/react'
import type { Dispatch, SetStateAction } from 'react'

/** Animatable transform applied to a single scattered letter. */
export interface ScatterState extends TargetAndTransition {
  x?: number
  y?: number
  rotate?: number
  scale?: number
  opacity?: number
}

/** Map of letter index → its current scatter transform. */
export interface ScatteredState {
  [index: number]: ScatterState
}

/**
 * Random "curling slide" offset for a letter: a large translation in a random
 * diagonal direction plus a matching rotation, so each hover flings the letter
 * away differently.
 */
export const getCurlingSlide = (): ScatterState => {
  const xDirection = Math.random() > 0.5 ? 1 : -1
  const yDirection = Math.random() > 0.5 ? 1 : -1

  return {
    x: xDirection * (100 + Math.random() * 80),
    y: yDirection * (100 + Math.random() * 80),
    rotate: xDirection * (30 + Math.random() * 30),
    scale: 1,
    opacity: 0.9,
  }
}

/** Scatter the letter at `index` by storing a fresh offset for it. */
export const handleHover = (
  index: number,
  setScattered: Dispatch<SetStateAction<ScatteredState>>
) => {
  setScattered((prev) => ({
    ...prev,
    [index]: getCurlingSlide(),
  }))
}
