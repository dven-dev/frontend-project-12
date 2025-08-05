const getApiUrl = () => {
  if (import.meta.env.DEV) {
    return '/api/v1'
  }
  return '/api/v1'
}

const getSocketUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:5001'
  }
  return window.location.origin
}

export { getApiUrl, getSocketUrl }
