<script lang="ts">

import { onMount } from 'svelte';
import type { Data } from '../../ts/data';

let data: Data[] = [];
let error: string = '';

async function fetchData() {
    try {
        // https://your-api-url.com/data
        const response = await fetch('https://openrouter.ai/api/v1/models');
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const jsonResponse = await response.json();
        data = jsonResponse.data;
        console.log(data)
    } catch (e: unknown) {
        if (e instanceof Error) {
            error = e.message;
        } else {
            error = 'An unknown error occurred';
        }
    }
}

onMount(() => {
    fetchData();
});

</script>

<div class="models_panel_use_A">
    {#if error}
        <div>Error: {error}</div>
    {:else if data}
        {#each data as item}
            <div class="models_panel_use_A_panel">
                <div class="models_panel_use_A_panel_left">
                    <div class="models_panel_use_A_panel_text">Id</div>
                    <div class="models_panel_use_A_panel_text">Name</div>
                    <div class="models_panel_use_A_panel_text">Description</div>
                    <div class="models_panel_use_A_panel_text">Context_length</div>
                    <div class="models_panel_use_A_panel_text">Tokenizer</div>
                    <div class="models_panel_use_A_panel_text">Modality</div>
                </div>
                <div class="models_panel_use_A_panel_right">
        
                    <div class="models_panel_use_A_panel_text" data-tooltip="{item?.name}">
                        {#if item?.name?.toString().length > 256}
                            {item.name.toString().slice(0, 256) + "..."}
                        {:else}
                            {item.name}
                        {/if}
                    </div>
        
                    <div class="models_panel_use_A_panel_text" data-tooltip="{item?.description}">
                        {#if item?.description?.toString().length > 256}
                            {item.description.toString().slice(0, 256) + "..."}
                        {:else}
                            {item.description}
                        {/if}
                    </div>
                    <div class="models_panel_use_A_panel_text" data-tooltip="{item?.context_length}">
                        {#if item?.context_length?.toString().length > 256}
                            {item.context_length.toString().slice(0, 256) + "..."}
                        {:else}
                            {item.context_length}
                        {/if}
                    </div>
        
                    <div class="models_panel_use_A_panel_text" data-tooltip="{item?.architecture.tokenizer}">
                        {#if item?.architecture.tokenizer?.toString().length > 256}
                            {item.architecture.tokenizer.toString().slice(0, 256) + "..."}
                        {:else}
                            {item.architecture.tokenizer}
                        {/if}
                    </div>
        
                    <div class="models_panel_use_A_panel_text" data-tooltip="{item?.architecture.modality}">
                        {#if item?.architecture.modality?.toString().length > 256}
                            {item.architecture.modality.toString().slice(0, 256) + "..."}
                        {:else}
                            {item.architecture.modality}
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    {/if}
    <div class="models_panel_use_B"><div class="models_panel_use_B"></div></div>
</div>
