export async function getUsers(request, resource) {
  const apiUrl = 'https://admin.a.hostedemail.com/api/'
  const method = 'get_user'
  const url = apiUrl + method

  const credentials = {
    user: 'hello@post-train.com',
    password: 'Testingtesting123'
  }

  const data = {
    credentials: credentials,
    user: credentials.user
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  const formatted = await res.json()

  const users = await Promise.all(
    formatted.metadata.roles.domain.map(async (item) => {
      const method = 'search_users'
      const url = apiUrl + method

      const data = {
        credentials: credentials,
        criteria: {
          domain: item,
          type: ['mailbox']
        },
        fields: ['createtime', 'type', 'forward']
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      let user = await res.json()
      return user
    })
  )

  let content = []
  for (let item of users) {
    content = [...content, ...item.users]
  }

  return content

  // if (accounts) {
  //   return {
  //     status: 200,
  //     body: {accounts: json.stringify(accounts)}
  //     }
  //   }
  // }
  //
  // return {
  //   status: 'failed',
  //   error: new Error(`Could not load ${url}`)
  // }
}
