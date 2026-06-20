import * as m from 'motion/react-m'
import { useRef } from 'react'
import { DEFAULT_TRANSITION } from '@/constants/motion'
import { useInViewOnce } from '@/hooks/useInViewOnce'

export interface TimelineEntryProps {
  /** Job/education title */
  title: string
  /** Date range or period */
  date: string
  /** Description (will be split into bullet points) */
  description: string
  /** Whether this is the last entry (no line below) */
  isLast?: boolean
  /** Optional delay for staggered animation (seconds) */
  staggerDelay?: number
}

export const TimelineEntry = ({
  title,
  date,
  description,
  isLast = false,
  staggerDelay = 0,
}: TimelineEntryProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInViewOnce(ref, { margin: '-40px' })

  const bulletPoints = description
    .split('. ')
    .map((sentence) => sentence.trim().replace(/\.$/, ''))
    .filter(Boolean)

  const titleParts = title.split(/\s[-–]\s/)
  const [part1, part2] = titleParts

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ ...DEFAULT_TRANSITION, delay: staggerDelay }}
      className="relative flex gap-6 md:gap-10 group"
    >
      {!isLast && (
        <div
          className="absolute left-2.75 md:left-3.75 top-8 bottom-0 w-px bg-border group-hover:bg-gray transition-colors duration-300"
          aria-hidden="true"
        />
      )}

      <div className="shrink-0 flex flex-col items-center pt-0.5">
        <div
          className="w-6 h-6 md:w-7.5 md:h-7.5 rounded-full border-2 border-border bg-dark flex items-center justify-center shrink-0 group-hover:border-accent group-hover:scale-110 transition-all duration-300"
          aria-hidden="true"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-gray group-hover:bg-accent transition-colors duration-300" />
        </div>
      </div>

      <div className="flex-1 min-w-0 pb-12 md:pb-14">
        <div className="hover-card rounded-lg bg-surface p-5 hover:-translate-y-0.5">
          <p className="text-xs md:text-sm mb-2 font-medium tracking-wide text-center sm:text-left text-gray">
            {date}
          </p>

          <p className="section-title text-center sm:text-left text-[20px] mb-2">
            {part2 ? (
              <>
                <span className="block sm:hidden">
                  {part1}
                  <br />
                  {part2}
                </span>
                <span className="hidden sm:inline">
                  {part1} – {part2}
                </span>
              </>
            ) : (
              title
            )}
          </p>

          <ul className="space-y-1.5 text-[9px] sm:text-xs md:text-sm leading-relaxed text-left">
            {bulletPoints.map((point) => (
              <li key={point} className="section-description flex items-start gap-2 text-gray">
                <span className="hidden sm:flex shrink-0 w-[1em] h-[1.625em] items-center justify-center text-lg">
                  ·
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </m.div>
  )
}
