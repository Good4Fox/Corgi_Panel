<script lang="ts">
    /// <reference path ="../node_modules/jquery/dist/jquery.min.js"/>
import Preloader from '../../src/svelte/lib/Preloader.svelte'
import Models from '../../src/svelte/App/Models.svelte'

import { onMount, onDestroy, afterUpdate } from 'svelte'
import { writable } from 'svelte/store'

import { smoothURL } from '../../src/ts/smoothScroll'


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

function handleClick_1() {
    smoothURL('/')
}

</script>


{#if showDiv}
    <Preloader />
{:else if showPage}
    <div class="models_panel">
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="models_panel_text">
            <div on:click={handleClick_1} class="models_panel_text_A">Назад</div>
            <div class="models_panel_text_B">Список моделей</div>
            <div class="models_panel_text_B"></div>
        </div>
        <div class="models_panel_use">
            <Models />
        </div>
    </div>
{/if}
