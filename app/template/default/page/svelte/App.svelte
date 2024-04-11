<script lang="ts">
    /// <reference path ="../node_modules/jquery/dist/jquery.min.js"/>
import Preloader from '../../src/svelte/lib/Preloader.svelte'
import Home_app from '../../src/svelte/App/Home_app.svelte'

import { onMount, onDestroy, afterUpdate } from 'svelte'
import { writable } from 'svelte/store'

import { smoothScroll } from '../../src/ts/smoothScroll'


let showDiv = false
let showPage = false


let scrollBlocked = false

// Load

onMount(() => {
    showDiv = true
    setTimeout(() => {
        showDiv = false
        showPage = true
    }, 1000);
})

// End Load

</script>


{#if showDiv}
    <Preloader />
{:else if showPage}
    <Home_app />
{/if}
