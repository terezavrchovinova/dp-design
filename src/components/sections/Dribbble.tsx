import { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(_: VercelRequest, res: VercelResponse) {
  const client_id = process.env.DRIBBBLE_CLIENT_ID
  const client_secret = process.env.DRIBBBLE_CLIENT_SECRET

  if (!client_id || !client_secret) {
    console.error('Missing client ID or secret')
    return res.status(500).json({ error: 'Missing Dribbble credentials.' })
  }

  try {
    const tokenRes = await fetch('https://dribbble.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id,
        client_secret,
        grant_type: 'client_credentials',
      }),
    })

    const tokenData = await tokenRes.json()
    console.log('Access Token Response:', tokenData)

    if (!tokenData.access_token) {
      throw new Error('Unable to get access token')
    }

    const shotsRes = await fetch('https://api.dribbble.com/v2/user/shots', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const shots = await shotsRes.json()
    console.log('Shots:', shots)

    return res.status(200).json(shots)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Dribbble fetch error:', err.message)
      return res
        .status(500)
        .json({ error: err.message || 'Something went wrong' })
    }
    console.error('Dribbble fetch error:', err)
    return res.status(500).json({ error: 'An unknown error occurred' })
  }
}
