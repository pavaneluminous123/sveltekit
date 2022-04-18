export async function getUser(user) {
  const apiUrl = 'https://admin.a.hostedemail.com/api/'
  const method = 'get_user'
  const url = apiUrl + method

  const credentials = {
    user: 'hello@post-train.com',
    password: 'Testingtesting123'
  }

  const data = {
    credentials: credentials,
    user: user
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  const content = await res.json()
  console.log('getUser', content)
  return content
}
