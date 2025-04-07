import type { VercelRequest, VercelResponse } from '@vercel/node'

// Constants for API URLs
const DRIBBBLE_TOKEN_URL = 'https://dribbble.com/oauth/token'
const DRIBBBLE_SHOTS_URL = 'https://api.dribbble.com/v2/user/shots'

// Custom error type for more control
class APIError extends Error {
  constructor(
    message: string,
    public raw: string,
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const client_id = process.env.DRIBBBLE_CLIENT_ID
  const client_secret = process.env.DRIBBBLE_CLIENT_SECRET

  // Check for missing credentials
  if (!client_id || !client_secret) {
    console.error('❌ Missing Dribbble credentials.')
    return res.status(500).json({ error: 'Missing Dribbble credentials.' })
  }

  try {
    // Step 1: Get access token from Dribbble
    const tokenRes = await fetch(DRIBBBLE_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id,
        client_secret,
        grant_type: 'client_credentials',
      }),
    })

    // Safely handle token response (non-JSON fallback)
    let tokenData: { access_token?: string }
    try {
      tokenData = await tokenRes.json()
    } catch {
      const raw = await tokenRes.text()
      throw new APIError('Failed to parse token JSON response', raw)
    }

    // Check if we got an access token
    if (!tokenData.access_token) {
      throw new APIError('Dribbble token is missing', JSON.stringify(tokenData))
    }

    // Step 2: Fetch shots using the access token
    const shotsRes = await fetch(DRIBBBLE_SHOTS_URL, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    // Safely handle shots response (non-JSON fallback)
    interface Shot {
      id: number
      title: string
      description: string | null
      images: { [key: string]: string }
      html_url: string
      [key: string]: unknown // Add additional fields if necessary
    }

    let shots: Shot[]
    try {
      shots = await shotsRes.json()
    } catch {
      const raw = await shotsRes.text()
      throw new APIError('Failed to parse shots JSON response', raw)
    }

    // Ensure the response is an array of shots
    if (!Array.isArray(shots)) {
      throw new APIError(
        'Dribbble returned an unexpected format for shots',
        JSON.stringify(shots),
      )
    }

    // Respond with the shots data
    return res.status(200).json(shots)
  } catch (err: unknown) {
    if (err instanceof APIError) {
      // Handle our custom error gracefully
      console.error('❌ APIError:', err.message, err.raw)
      return res.status(500).json({ error: err.message, raw: err.raw })
    } else if (err instanceof Error) {
      // Catch any other error that wasn't an APIError
      console.error('🔥 Error:', err.message)
      return res.status(500).json({ error: err.message })
    } else {
      // Unknown error type
      console.error('🔥 Unknown error:', err)
      return res.status(500).json({ error: 'An unknown error occurred' })
    }
  }
}
