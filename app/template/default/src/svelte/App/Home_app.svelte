<script lang="ts">
import { smoothURL } from '../../../src/ts/smoothScroll'

function handleClick_1() {
    smoothURL('/models')
}
function handleClick_2() {

}
function handleClick_3() {

}

</script>


<div class="home_app">
    <div class="home_app_logo"></div>
    <div class="home_app_text">Интерфейс для управления метаданными моделей</div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="home_app_st">
        <div on:click={handleClick_1} class="home_app_st_text_1">Список всех моделей</div>
        <div on:click={handleClick_2} class="home_app_st_text_2">Добавление новой модели в базу данных</div>
        <div on:click={handleClick_3} class="home_app_st_text_3">Получение подробной информации о конкретной модели</div>
    </div>
</div>