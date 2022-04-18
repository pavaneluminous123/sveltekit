<script>
  import { supabase} from '$lib/utils/supabase'
  import Loader from '$lib/components/Loader/Loader.svelte'
  import { createProfile } from '$lib/utils/supabase'
  import { user } from '$lib/stores/sessionStore'

  let loading = false
  let email = ''
  let password = ''
  let fullName = ''
  let displayName = ''
  let errorMessage = ''
  let successMessage = false

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const onNewSignUp = async () => {
    if (!validateEmail(email)) {
      successMessage = false
      errorMessage = 'Invalid email'
    }
    // Valid email
    else {
      loading = true

      try {
        // Send login email
        const { user, session, error } = await supabase.auth.signUp(
          {
            email: email,
            password: password
          },
          {
            data: {
              full_name: fullName,
              display_name: displayName
            }
          }
        )

        if (error) throw error

        // Store user id to DB - Profile
        await createProfile({
          id: user.id,
          email: email,
          full_name: fullName,
          display_name: displayName,
          avatar_url: '',
          created_at: new Date(),
          updated_at: new Date()
        })

        updateUser({
          fullName: fullName,
          displayName: displayName,
          avatarUrl: '',
          id: user.id,
          email: user.email,
          lastSignIn: user.last_sign_in_at,
          role: user.role
        })
      } catch (error) {
        errorMessage = `${error.error_description || error.message}`
      } finally {
        loading = false
      }
    }
  }

  const updateUser = (userObj) => {
    // Update user object
    user.set(userObj)
  }
</script>

<h1 class="t-h1 mt-3">Register</h1>
{#if successMessage || errorMessage}
  <p class="mt-1">Register with email & password</p>
{/if}

<form class="flex-col flex flex-center">
  {#if successMessage}
    <p class="mt-2">{successMessage}</p>
  {:else if loading}
    <Loader />
  {:else}
    <input type="email" class="mt-1" placeholder="Email" bind:value={email} />
    <input type="password" class="mt-1" placeholder="Password" bind:value={password} />
    <input type="text" class="mt-1" placeholder="Full name" bind:value={fullName} />
    <input type="text" class="mt-1" placeholder="Display name" bind:value={displayName} />
    <button class="mt-1" on:click={onNewSignUp} type="primary">Register</button>
  {/if}

  {#if errorMessage}
    <p class="mt-2"> {errorMessage}</p>
  {/if}
</form> 