<script>
  import { goto } from '$app/navigation'
  export let action
  export let type = 'secondary'
  export let fullWidth = false
  export let className = ''
  export let disabled = false

  function onClick() {
    // console.log('action: ', typeof action)
    if (typeof action === 'function') {
      action()
    } else if (typeof action === 'string') {
      goto(action)
    }
  }
</script>

<button-new
  class={`flex px-0.75 py-0.5 rounded-0.5 leading-medium font-medium cursor-pointer ${type} ${className} ${fullWidth ? 'w-full' : 'self-start'} ${
    disabled ? 'opacity-50' : ''
  }`}
  on:click|preventDefault={onClick}
  {disabled}
>
  <slot />
</button-new>

<style>
  .primary {
    background: var(--accent-color);
    color: var(--secondary-color);
  }

  .secondary {
    background: var(--primary-color);
    color: var(--secondary-color);
  }
</style>
