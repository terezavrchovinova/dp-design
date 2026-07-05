// Thumbnails live in mobile/ and desktop/ folders with matching file names;
// both maps are keyed by that shared name (Vite resolves each to a hashed URL).
const DESKTOP_THUMBS = import.meta.glob<string>('../assets/project_thumbnails/desktop/*.webp', {
  eager: true,
  import: 'default',
})
const MOBILE_THUMBS = import.meta.glob<string>('../assets/project_thumbnails/mobile/*.webp', {
  eager: true,
  import: 'default',
})

const thumbnails = (fileName: string) => {
  const imageMobile = MOBILE_THUMBS[`../assets/project_thumbnails/mobile/${fileName}.webp`]
  const imageDesktop = DESKTOP_THUMBS[`../assets/project_thumbnails/desktop/${fileName}.webp`]
  if (!imageMobile || !imageDesktop) {
    throw new Error(`Missing project thumbnail pair: ${fileName}.webp`)
  }
  return { imageMobile, imageDesktop }
}

export interface Project {
  /** Unique slug — doubles as the translation key under `projects.items.*`. */
  key: string
  imageMobile: string
  imageDesktop: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    key: 'kynez',
    ...thumbnails('kynez'),
    link: 'https://www.behance.net/gallery/222330047/Kynez-Sportswear-brand-identity',
  },
  {
    key: 'tmobile',
    ...thumbnails('t-mobile'),
    link: 'https://www.behance.net/gallery/238307417/T-Mobile-Concept-Campaign',
  },
  {
    key: 'maastricht',
    ...thumbnails('maastricht'),
    link: 'https://www.behance.net/gallery/199767453/Maastricht-Festival-Visual',
  },
  {
    key: 'saleskit',
    ...thumbnails('saleskit'),
    link: 'https://www.behance.net/gallery/219839403/Design-for-Saleskit',
  },
  {
    key: 'various_banners',
    ...thumbnails('various_banners'),
    link: 'https://www.behance.net/gallery/223131257/Banner-Designs-Event-Exhibition-Series',
  },
  {
    key: 'dita',
    ...thumbnails('dita'),
    link: 'https://www.behance.net/gallery/205350295/Dita-Von-Teese-visual',
  },
  {
    key: 'letitroll',
    ...thumbnails('let_it_roll'),
    link: 'https://www.behance.net/gallery/196798719/Let-It-Roll-Festival-poster',
  },
  {
    key: 'newtonia',
    ...thumbnails('newtonia'),
    link: 'https://www.behance.net/gallery/201179759/Game-designNewtonia',
  },
  {
    key: 'brejcha',
    ...thumbnails('brejcha'),
    link: 'https://www.behance.net/gallery/189009581/Boris-Brejcha-video-spot',
  },
  {
    key: 'renaissance',
    ...thumbnails('mona_lisa'),
    link: 'https://www.behance.net/gallery/207746525/The-Great-Masters-of-the-Renaissance-video-spot',
  },
  {
    key: 'deathvalley',
    ...thumbnails('death_valley'),
    link: 'https://www.behance.net/gallery/200322649/Death-Valley-design',
  },
  {
    key: 'jurassic',
    ...thumbnails('jurassic_adventure'),
    link: 'https://www.behance.net/gallery/188776307/brochure-Jurassic-Adventure',
  },
]
