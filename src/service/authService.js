const AUTH_BASE_URL = 'https://dummyjson.com/auth'

export async function loginUser({ username, password, expiresInMins = 30 }) {
  const response = await fetch(`${AUTH_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
      expiresInMins
    })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.message || 'Login failed')
  }

  return data
}

export async function getCurrentAuthUser(accessToken) {
  const response = await fetch(`${AUTH_BASE_URL}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.message || 'Failed to fetch current user')
  }

  return data
}