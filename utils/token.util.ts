import Cookies from 'js-cookie'

export const TokenStorageKey = 'token'

export function getToken(): string | null {
  const token = Cookies.get(TokenStorageKey)
  return token ? `bearer ${token}` : null
}

export function setToken(token: string) {
  if (typeof token !== 'string') {
    return
  }
  return Cookies.set(TokenStorageKey, token, {
    expires: 14,
  })
}