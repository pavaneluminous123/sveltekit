<script>
  import { supabase } from '$lib/utils/supabase'
  import Input from '$lib/components/Input/Input.svelte'
  import Button from '$lib/components/Button/Button.svelte'
  import Loader from '$lib/components/Loader/Loader.svelte'

  const user = supabase.auth.user()
  let loading = false
  let email = ''
  let password = ''
  let errorMessage = ''
  let successMessage = ''

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const onSignIn = async () => {
    if (!validateEmail(email)) {
      successMessage = ''
      errorMessage = 'Invalid email'
    }
    // Valid email
    else {
      loading = true

      try {
        // Send login email
        console.log('login: ', email, password)
        const { user, error } = await supabase.auth.signIn({
          email: email,
          password: password
        })

        // const { error } = await supabase.auth.signIn({ email })
        if (error) throw error
        successMessage = 'Successful login'
      } catch (error) {
        errorMessage = `${error.error_description || error.message}`
      } finally {
        loading = false
      }
    }
  }
</script>

<h1 class="t-h1 mt-3">Login</h1>

<form class="flex-col flex flex-center">
  {#if successMessage}
    <p class="mt-2">{successMessage}</p>
  {:else if loading}
    <Loader />
  {:else}
    <Input type="email" className="mt-1" placeholder="Your email" bind:text={email} />
    <Input type="password" className="mt-1" placeholder="Your password" bind:text={password} />
    <Button className="mt-1" action={onSignIn} type="primary">Login</Button>
  {/if}

  {#if errorMessage}
    <p class="mt-2">{errorMessage}</p>
  {/if}
</form>