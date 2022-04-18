// FETCH POST
export const fetchJSON = async (url, data, options) => {
  try {
    // Default options are marked with *
    const defaultOptions = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data || {}) // body data type must match "Content-Type" header
    }
    const response = await fetch(url, { ...defaultOptions, ...options })
    return await response.json() // parses JSON response into native JavaScript objects
  } catch (err) {
    console.log(err)
    // throw new Error(err.message);
  }
}

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
export const getId = (length) => {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
