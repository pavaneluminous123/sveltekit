
<script>
  import { supabase } from '$lib/utils/supabase'
  import { SignUp, SignIn } from '$lib/components'
 import Signup from '$lib/components/SignUp/SignUp.svelte'
 import Signin from '$lib/components/SignIn/SignIn.svelte'

  //const user = supabase.auth.user()
  let showSignUp = false

  const onToggleSignUp = async () => {
    showSignUp = !showSignUp
  }
</script>

{#if showSignUp}
  <Signup />
  <p class="mt-2 underline cursor-pointer inline-block" on:click|preventDefault={onToggleSignUp}>Cancel</p>
{:else}
  <Signin />
  <p class="mt-2 underline cursor-pointer inline-block" on:click|preventDefault={onToggleSignUp}>Register</p>
{/if}
