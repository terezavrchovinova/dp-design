import afterEffectsIcon from '../assets/icons/after-effects.svg'
import cinema4dIcon from '../assets/icons/cinema-4d.svg'
import dimensionIcon from '../assets/icons/dimension.svg'
import figmaIcon from '../assets/icons/figma.svg'
import illustratorIcon from '../assets/icons/illustrator.svg'
import indesignIcon from '../assets/icons/indesign.svg'
import midjourneyIcon from '../assets/icons/midjourney.webp'
import photoshopIcon from '../assets/icons/photoshop.svg'
import lightroomIcon from '../assets/icons/photoshop-lightroom.svg'
import premiereProIcon from '../assets/icons/premiere-pro.svg'

export interface Tool {
  name: string
  src: string
}

export const TOOLS: Tool[] = [
  { name: 'Adobe Photoshop', src: photoshopIcon },
  { name: 'Adobe Illustrator', src: illustratorIcon },
  { name: 'Adobe InDesign', src: indesignIcon },
  { name: 'Adobe After Effects', src: afterEffectsIcon },
  { name: 'Adobe Premiere Pro', src: premiereProIcon },
  { name: 'Adobe Lightroom', src: lightroomIcon },
  { name: 'Adobe Dimension', src: dimensionIcon },
  { name: 'Figma', src: figmaIcon },
  { name: 'Cinema 4D', src: cinema4dIcon },
  { name: 'Midjourney', src: midjourneyIcon },
]
