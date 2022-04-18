<script>
  import { page } from '$app/stores'
  import { user } from '$lib/stores/sessionStore'
  import { downloadImage } from '$lib/utils/supabase'
  import { Button } from '$lib/components'

  const imagePath = async (node, path) => {
    const src = await downloadImage(path)
    node.src = src
  }
</script>

<header class="h-4 py-1 flex justify-center items-center border-b border solid">
  <div class="absolute right-2">
    {#if $user}
      <a href="/profile" class="flex rounded-0.5 px-0.5 py-0.75 gap-0.5 font-medium cursor-pointer">
        <!-- <img class="w-1.5 rounded-0.75" src={$user.avatar_url ? $user.avatar_url : 'logo.svg'} alt="Avatar" /> -->
        <img use:imagePath={$user.avatarUrl} src="logo.svg" alt="Avatar" class="w-1.5 rounded-0.75" />

        <h4>{$user.displayName}</h4>
      </a>
      <!-- {:else}
			<Button action="/">Login</Button> -->
    {/if}
  </div>

  <nav>
    <a sveltekit:prefetch class:active={$page.path === '/'} href="/">(Onboarding)</a>
    <a sveltekit:prefetch class:active={$page.path === '/accounts'} href="/accounts">Accounts</a>
    <a sveltekit:prefetch class:active={$page.path === '/forwards'} href="/forwards">Forwards</a>
    <a sveltekit:prefetch class:active={$page.path === '/domains'} href="/domains">Domains</a>
    <a sveltekit:prefetch class:active={$page.path === '/test'} href="/test">(Test)</a>
    <a sveltekit:prefetch class:active={$page.path === '/test/design'} href="/test/design">(Design)</a>
  </nav>
</header>

<style>
  header {
    /* height: 4rem;
		padding: 0 1rem;
		display: flex;
		justify-content: center;
		align-items: center; */
    border-color: var(--accent-secondary-color);
  }

  /* header div {
		position: absolute;
		right: 2rem;
	} */

  header div a {
    display: flex;
    gap: 0.5rem;
    font-weight: 500;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
  }

  /* header img {
		width: 1.5rem;
		border-radius: 0.75rem;
	} */

  nav {
    display: flex;
    gap: 0.5rem;
  }

  nav a {
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
  }

  nav a:hover {
    background: var(--accent-secondary-color);
  }

  nav a.active {
    background: var(--primary-color);
    color: var(--secondary-color);
  }
</style>
