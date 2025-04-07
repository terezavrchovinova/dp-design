import type { VercelRequest, VercelResponse } from '@vercel/node'

const DRIBBBLE_TOKEN_URL = 'https://dribbble.com/oauth/token'
const DRIBBBLE_SHOTS_URL = 'https://api.dribbble.com/v2/user/shots'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const client_id = process.env.DRIBBBLE_CLIENT_ID
  const client_secret = process.env.DRIBBBLE_CLIENT_SECRET

  if (!client_id || !client_secret) {
    return res.status(500).json({ error: 'Missing Dribbble credentials.' })
  }

  try {
    // Step 1: Get access token
    const tokenRes = await fetch(DRIBBBLE_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id,
        client_secret,
        grant_type: 'client_credentials',
      }),
    })

    const tokenData = await tokenRes.json()

    if (!tokenData.access_token) {
      throw new Error('Unable to get access token from Dribbble.')
    }

    // Step 2: Fetch shots
    const shotsRes = await fetch(DRIBBBLE_SHOTS_URL, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const shots = await shotsRes.json()

    res.status(200).json(shots)
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'An error occurred.' })
  }
}
