import { createClient } from '@supabase/supabase-js'
import { user, userIsLoading } from '$lib/stores/sessionStore'

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

export const initAuth = async () => {
  const currentUser = await supabase.auth.user()
  if (currentUser) {
    const userDoc = await getProfile(currentUser.id)
    if (!userDoc) return

    user.set({
      ...userDoc,
      id: currentUser.id,
      email: currentUser.email,
      lastSignIn: currentUser.last_sign_in_at,
      role: currentUser.role
    })
  }
  userIsLoading.set(false)

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (!session) return

    const userDoc = await getProfile(session.user.id)
    if (!userDoc) return

    user.set({
      ...userDoc,
      id: session.id,
      email: session.email,
      lastSignIn: session.last_sign_in_at,
      role: session.role
    })
    userIsLoading.set(false)
  })
}

export const isUserLoggedIn = () => {
  const user = supabase.auth.user()
  return user ? true : false
}

export const getProfile = async (userId) => {
  try {
    let { data, error, status } = await supabase.from('profiles').select(`full_name, display_name, avatar_url, created_at`).eq('id', userId).single()

    if (error && status !== 406) throw error
    if (!data) throw { message: 'No profile data' }

    // Return user data
    return {
      fullName: data.full_name,
      displayName: data.display_name,
      avatarUrl: data.avatar_url,
      createdAt: data.created_at
    }
  } catch (error) {
    // console.log('getProfile: ', error.message)
  }
}

export const updateProfile = async (user) => {
  try {
    let { error } = await supabase.from('profiles').upsert(user, {
      returning: 'minimal' // Don't return the value after inserting
    })

    if (error) throw error
  } catch (error) {
    console.log(error.message)
  }
}

export const createProfile = async (user) => {
  try {
    console.log('Add user: ', user)
    let { error } = await supabase.from('profiles').insert([user], { returning: 'minimal' })

    if (error) throw error
  } catch (error) {
    console.log(error.message)
  }
}

export const signOut = async () => {
  try {
    let { error } = await supabase.auth.signOut()
    console.log('error: ', error)
    if (error) throw error

    // Success
    user.set(false)
  } catch (error) {
    console.log(error.message)
  }
}

export const downloadImage = async (path) => {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(path)
    if (error) throw error
    return URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}

export const uploadAvatar = async (file) => {
  try {
    // console.log(file.name);
    const fileExt = file.name.split('.').pop()
    console.log('file. ', file)
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`
    console.log('filePath. ', filePath)
    let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

    if (uploadError) throw uploadError

    console.log('success! ', filePath)
    // const blob = await downloadImage(filePath);
    // path = filePath;
    // dispatch('upload');
    return {
      // blob: blob,
      path: filePath
    }
  } catch (error) {
    console.log('Uploaded: ', error.message)
  }
}
