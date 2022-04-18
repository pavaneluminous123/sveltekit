<script>
  import { getId } from '$lib/utils/helpers'
  export let className = ''
  export let text = ''
  export let placeholder
  export let label
  export let type
  export let disabled = false

  let internalText = text
  let id = getId(6)

  $: {
    text = internalText
  }
</script>

<div class={`flex flex-col ${className}`}>
  {#if label}
    <label for={id}>{label}</label>
  {/if}

  {#if type === 'number'}
    <input {id} type="number" class="mt-0.5" {placeholder} bind:value={internalText} {disabled} />
  {:else if type === 'email'}
    <input {id} type="email" class="mt-0.5" {placeholder} bind:value={internalText} {disabled} />
  {:else if type === 'password'}
    <input {id} type="password" class="mt-0.5" {placeholder} bind:value={internalText} {disabled} />
  {:else}
    <input {id} type="text" class="mt-0.5" {placeholder} bind:value={internalText} {disabled} />
  {/if}
</div>

<style>
  input {
    background: var(--accent-secondary-color);
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    width: 24rem;
  }

  input::placeholder {
    color: var(--accent-primary-color);
  }
</style>
