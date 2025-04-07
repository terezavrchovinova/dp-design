// /api/dribbble.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'

type DribbbleShot = {
  id: number
  title: string
  html_url: string
  images: {
    normal: string
    hidpi?: string
    teaser?: string
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch('https://api.dribbble.com/v2/user/shots', {
      headers: {
        Authorization: `Bearer ${process.env.DRIBBBLE_API_TOKEN}`,
      },
    })

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: 'Failed to fetch Dribbble shots' })
    }

    const data: DribbbleShot[] = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Dribbble API error:', error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}
