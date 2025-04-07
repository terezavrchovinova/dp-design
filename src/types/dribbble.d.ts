export interface DribbbleShot {
  id: number
  title: string
  html_url: string
  images: {
    hidpi?: string
    normal: string
    teaser: string
  }
  [key: string]: string | number | boolean | object | undefined
}
