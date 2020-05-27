export const post = async (path: string, body: object) => {
  try {
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
