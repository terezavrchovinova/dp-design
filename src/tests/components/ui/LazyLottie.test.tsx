import { describe, expect, it, vi } from 'vitest'
import { LazyLottie } from '@/components/ui/LazyLottie'
import { render, waitFor } from '@/tests/utils'

const { loadAnimationMock, playMock, pauseMock } = vi.hoisted(() => {
  const playMock = vi.fn()
  const pauseMock = vi.fn()
  return {
    playMock,
    pauseMock,
    loadAnimationMock: vi.fn(() => ({ destroy: vi.fn(), play: playMock, pause: pauseMock })),
  }
})

vi.mock('lottie-web/build/player/lottie_light', () => ({
  default: { loadAnimation: loadAnimationMock },
}))

// Stable reference, like a real imported .json asset — a fresh object each
// render would remount the animation instead of driving play/pause.
const animationData = {}

describe('LazyLottie', () => {
  it('autoplays by default when uncontrolled', async () => {
    render(<LazyLottie animationData={animationData} />)

    await waitFor(() => {
      expect(loadAnimationMock).toHaveBeenCalled()
    })
    expect(loadAnimationMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ autoplay: true, loop: true })
    )
  })

  it('never autoplays when playback is controlled via `playing`', async () => {
    render(<LazyLottie animationData={animationData} playing={false} />)

    await waitFor(() => {
      expect(loadAnimationMock).toHaveBeenCalled()
    })
    expect(loadAnimationMock).toHaveBeenLastCalledWith(expect.objectContaining({ autoplay: false }))
    expect(playMock).not.toHaveBeenCalled()
  })

  it('starts playing after load when mounted with `playing` already true', async () => {
    playMock.mockClear()
    render(<LazyLottie animationData={animationData} playing />)

    await waitFor(() => {
      expect(playMock).toHaveBeenCalled()
    })
  })

  it('plays and pauses as `playing` toggles', async () => {
    playMock.mockClear()
    pauseMock.mockClear()

    const { rerender } = render(<LazyLottie animationData={animationData} playing={false} />)
    await waitFor(() => {
      expect(loadAnimationMock).toHaveBeenCalled()
    })

    rerender(<LazyLottie animationData={animationData} playing />)
    await waitFor(() => {
      expect(playMock).toHaveBeenCalled()
    })

    rerender(<LazyLottie animationData={animationData} playing={false} />)
    await waitFor(() => {
      expect(pauseMock).toHaveBeenCalled()
    })
  })
})
