import { derived, writable } from 'svelte/store'

export const currentShows = writable({})

export const currentShowsPairs = derived(
    currentShows,
    $currentShows => {
        let res = {}
        for (const [station, details] of Object.entries($currentShows)) {
            res[station] = details['show']
        }
        return res
    })

export const connected = writable(false)


