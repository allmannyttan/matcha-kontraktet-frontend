import history from '../utils/history'

export const post = async (path: string, body: object, token?: string) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(body),
    })

    if (response.status !== 200) {
      throw new Error('something went wrong')
    }

    return response.json()
  } catch (err) {
    console.log(err)
  }
}

export const put = async (path: string, body: object, token?: string) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(body),
    })

    if (response.status !== 200) {
      throw new Error('something went wrong')
    }

    return response.json()
  } catch (err) {
    console.log(err)
  }
}

export const get = async (path: string, token?: string) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    })

    const parsedResponse = await response.json()

    if (response.status === 401 && parsedResponse.message === 'jwt expired') {
      history.push('/login')
    }

    if (response.status !== 200) {
      throw new Error('something went wrong')
    }

    return parsedResponse
  } catch (err) {
    console.log(err)
  }
}
