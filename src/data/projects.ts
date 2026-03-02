import brejchaImgDesktop from '../assets/project_thumbnails/desktop/brejcha.webp'
import deathvalleyImgDesktop from '../assets/project_thumbnails/desktop/death_valley.webp'
import ditaImgDesktop from '../assets/project_thumbnails/desktop/dita.webp'
import jurassicImgDesktop from '../assets/project_thumbnails/desktop/jurassic_adventure.webp'
import kynezImgDesktop from '../assets/project_thumbnails/desktop/kynez.webp'
import letItRollImgDesktop from '../assets/project_thumbnails/desktop/let_it_roll.webp'
import maastrichtImgDesktop from '../assets/project_thumbnails/desktop/maastricht.webp'
import renaissanceImgDesktop from '../assets/project_thumbnails/desktop/mona_lisa.webp'
import newtoniaImgDesktop from '../assets/project_thumbnails/desktop/newtonia.webp'
import saleskitImgDesktop from '../assets/project_thumbnails/desktop/saleskit.webp'
import tmobileImgDesktop from '../assets/project_thumbnails/desktop/t-mobile.webp'
import variousBannersImgDesktop from '../assets/project_thumbnails/desktop/various_banners.webp'
import brejchaImgMobile from '../assets/project_thumbnails/mobile/brejcha.webp'
import deathvalleyImgMobile from '../assets/project_thumbnails/mobile/death_valley.webp'
import ditaImgMobile from '../assets/project_thumbnails/mobile/dita.webp'
import jurassicImgMobile from '../assets/project_thumbnails/mobile/jurassic_adventure.webp'
import kynezImgMobile from '../assets/project_thumbnails/mobile/kynez.webp'
import letItRollImgMobile from '../assets/project_thumbnails/mobile/let_it_roll.webp'
import maastrichtImgMobile from '../assets/project_thumbnails/mobile/maastricht.webp'
import renaissanceImgMobile from '../assets/project_thumbnails/mobile/mona_lisa.webp'
import newtoniaImgMobile from '../assets/project_thumbnails/mobile/newtonia.webp'
import saleskitImgMobile from '../assets/project_thumbnails/mobile/saleskit.webp'
import tmobileImgMobile from '../assets/project_thumbnails/mobile/t-mobile.webp'
import variousBannersImgMobile from '../assets/project_thumbnails/mobile/various_banners.webp'

export interface Project {
  id: number
  key: string
  imageMobile: string
  imageDesktop: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    key: 'kynez',
    imageMobile: kynezImgMobile,
    imageDesktop: kynezImgDesktop,
    link: 'https://www.behance.net/gallery/222330047/Kynez-Sportswear-brand-identity',
  },
  {
    id: 2,
    key: 'tmobile',
    imageMobile: tmobileImgMobile,
    imageDesktop: tmobileImgDesktop,
    link: 'https://www.behance.net/gallery/238307417/T-Mobile-Concept-Campaign',
  },
  {
    id: 3,
    key: 'maastricht',
    imageMobile: maastrichtImgMobile,
    imageDesktop: maastrichtImgDesktop,
    link: 'https://www.behance.net/gallery/199767453/Maastricht-Festival-Visual',
  },
  {
    id: 4,
    key: 'saleskit',
    imageMobile: saleskitImgMobile,
    imageDesktop: saleskitImgDesktop,
    link: 'https://www.behance.net/gallery/219839403/Design-for-Saleskit',
  },
  {
    id: 5,
    key: 'various_banners',
    imageMobile: variousBannersImgMobile,
    imageDesktop: variousBannersImgDesktop,
    link: 'https://www.behance.net/gallery/223131257/Banner-Designs-Event-Exhibition-Series',
  },
  {
    id: 6,
    key: 'dita',
    imageMobile: ditaImgMobile,
    imageDesktop: ditaImgDesktop,
    link: 'https://www.behance.net/gallery/205350295/Dita-Von-Teese-visual',
  },
  {
    id: 7,
    key: 'letitroll',
    imageMobile: letItRollImgMobile,
    imageDesktop: letItRollImgDesktop,
    link: 'https://www.behance.net/gallery/196798719/Let-It-Roll-Festival-poster',
  },
  {
    id: 8,
    key: 'newtonia',
    imageMobile: newtoniaImgMobile,
    imageDesktop: newtoniaImgDesktop,
    link: 'https://www.behance.net/gallery/201179759/Game-designNewtonia',
  },
  {
    id: 9,
    key: 'brejcha',
    imageMobile: brejchaImgMobile,
    imageDesktop: brejchaImgDesktop,
    link: 'https://www.behance.net/gallery/189009581/Boris-Brejcha-video-spot',
  },
  {
    id: 10,
    key: 'renaissance',
    imageMobile: renaissanceImgMobile,
    imageDesktop: renaissanceImgDesktop,
    link: 'https://www.behance.net/gallery/207746525/The-Great-Masters-of-the-Renaissance-video-spot',
  },
  {
    id: 11,
    key: 'deathvalley',
    imageMobile: deathvalleyImgMobile,
    imageDesktop: deathvalleyImgDesktop,
    link: 'https://www.behance.net/gallery/200322649/Death-Valley-design',
  },
  {
    id: 12,
    key: 'jurassic',
    imageMobile: jurassicImgMobile,
    imageDesktop: jurassicImgDesktop,
    link: 'https://www.behance.net/gallery/188776307/brochure-Jurassic-Adventure',
  },
]
