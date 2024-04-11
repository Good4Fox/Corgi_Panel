<script lang="ts">
    /// <reference path ="../node_modules/jquery/dist/jquery.min.js"/>

import { onMount, onDestroy, afterUpdate } from 'svelte'
import { writable } from 'svelte/store'


function logo_button() {
    window.location.href = "/"
}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="home_error">
<div on:click={logo_button} class="home_error_logo">
    <div class="home_error_logo_ico"></div>
    <div class="home_error_logo_text">Corgi panel</div>
</div>
<div class="home_error_text">
    Упс страница не найдена
    <div class="home_error_text_2">
    К сожалению, страница, которую вы ищете, не может быть найдена. <br><br> Мы приносим свои извинения за неудобства. <br> мы всегда рады помочь вам найти то, что вы ищете. Пожалуйста, перейдите <br> на нашу главную страницу. <br><br>Спасибо за понимание!
    </div>
</div>
</div>