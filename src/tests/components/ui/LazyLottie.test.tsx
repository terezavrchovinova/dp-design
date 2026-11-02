import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LazyLottie } from '@/components/ui/LazyLottie'
import { render, waitFor } from '@/tests/utils'

const { loadAnimation, destroy } = vi.hoisted(() => ({
  loadAnimation: vi.fn(),
  destroy: vi.fn(),
}))

vi.mock('lottie-web/build/player/lottie_light', () => ({ default: { loadAnimation } }))

describe('LazyLottie', () => {
  beforeEach(() => {
    loadAnimation.mockReset()
    destroy.mockReset()
    loadAnimation.mockReturnValue({ destroy })
  })

  it('loads the animation into its container and applies className', async () => {
    const data = { v: '5.0' }
    const { container } = render(<LazyLottie animationData={data} className="icon" />)

    await waitFor(() => expect(loadAnimation).toHaveBeenCalledTimes(1))
    const options = loadAnimation.mock.calls[0][0]
    expect(options).toMatchObject({
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: data,
    })
    expect(options.container).toBe(container.firstChild)
    expect(container.firstChild).toHaveClass('icon')
  })

  it('destroys the animation on unmount', async () => {
    const { unmount } = render(<LazyLottie animationData={{}} />)
    await waitFor(() => expect(loadAnimation).toHaveBeenCalled())

    unmount()

    expect(destroy).toHaveBeenCalledTimes(1)
  })

  it('does not load if unmounted before the player module resolves', () => {
    const { unmount } = render(<LazyLottie animationData={{}} />)
    unmount()

    return Promise.resolve().then(() => expect(loadAnimation).not.toHaveBeenCalled())
  })
})
