import type { LottieAnimationData } from '@/components/ui/LazyLottie'
import photoIcon from '../assets/icons/photography.json'
import digitalIcon from '../assets/icons/social.json'
import videoIcon from '../assets/icons/video.json'
import visualBrandDesign from '../assets/icons/visual-brand-design.json'

export interface Service {
  key: string
  asset: LottieAnimationData
}

export const SERVICES: Service[] = [
  { key: 'design', asset: visualBrandDesign },
  { key: 'video', asset: videoIcon },
  { key: 'digital', asset: digitalIcon },
  { key: 'photo', asset: photoIcon },
]
