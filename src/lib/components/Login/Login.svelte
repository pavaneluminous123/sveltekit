<script>
  import { supabase } from '$lib/utils/supabase'
  import { SignUp, SignIn } from '$lib/components'

  const user = supabase.auth.user()
  let showSignUp = false

  const onToggleSignUp = async () => {
    showSignUp = !showSignUp
  }
</script>

{#if showSignUp}
  <SignUp />
  <p class="mt-2 underline cursor-pointer inline-block" on:click|preventDefault={onToggleSignUp}>Cancel</p>
{:else}
  <SignIn />
  <p class="mt-2 underline cursor-pointer inline-block" on:click|preventDefault={onToggleSignUp}>Register</p>
{/if}
