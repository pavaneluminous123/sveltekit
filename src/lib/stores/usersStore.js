import { writable } from 'svelte/store'
import { getUsers, getUser } from '$lib/api'

export const users = writable([])

export const fetchUsers = async () => {
  const loadedUsers = await getUsers()
  users.set(loadedUsers)
}

export const fetchUser = async (user) => {
  const loadedUser = await getUser(user)
  console.log('fetchUser', loadedUser)
  //filter and set users for the right user
}
