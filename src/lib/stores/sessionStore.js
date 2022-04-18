import { writable } from 'svelte/store'

export let userIsLoading = writable(true)
export let user = writable(false)
