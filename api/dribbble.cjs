// Constants for API URLs
const DRIBBBLE_TOKEN_URL = 'https://dribbble.com/oauth/token'
const DRIBBBLE_SHOTS_URL = 'https://api.dribbble.com/v2/user/shots'

// Custom error class for better error handling
class APIError extends Error {
  constructor(message, raw) {
    super(message)
    this.name = 'APIError'
    this.raw = raw
  }
}

/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
module.exports = async function handler(req, res) {
  const client_id = process.env.DRIBBBLE_CLIENT_ID
  const client_secret = process.env.DRIBBBLE_CLIENT_SECRET

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

    let tokenData
    try {
      tokenData = await tokenRes.json()
    } catch {
      const raw = await tokenRes.text()
      throw new APIError('Failed to parse token JSON response', raw)
    }

    if (!tokenData.access_token) {
      throw new APIError('Dribbble token is missing', JSON.stringify(tokenData))
    }

    // Step 2: Fetch Dribbble shots
    const shotsRes = await fetch(DRIBBBLE_SHOTS_URL, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    let shots
    try {
      shots = await shotsRes.json()
    } catch {
      const raw = await shotsRes.text()
      throw new APIError('Failed to parse shots JSON response', raw)
    }

    if (!Array.isArray(shots)) {
      throw new APIError(
        'Dribbble returned an unexpected format for shots',
        JSON.stringify(shots),
      )
    }

    return res.status(200).json(shots)
  } catch (err) {
    if (err instanceof APIError) {
      console.error('❌ APIError:', err.message, err.raw)
      return res.status(500).json({ error: err.message, raw: err.raw })
    } else if (err instanceof Error) {
      console.error('🔥 Error:', err.message)
      return res.status(500).json({ error: err.message })
    } else {
      console.error('🔥 Unknown error:', err)
      return res.status(500).json({ error: 'An unknown error occurred' })
    }
  }
}
