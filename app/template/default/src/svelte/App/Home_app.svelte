<script lang="ts">
import { smoothURL } from '../../../src/ts/smoothScroll'

function handleClick_1() {
    smoothURL('/models')
}
function handleClick_2() {
    alert( "Чтобы добавить модель, используйте следующую ссылку для POST запроса: localhost:3000/api/models.\n\nВыполните запрос, указав следующие поля:\n\n- id: число\n- name: строка\n- description: строка\n- context_length: число\n- tokenizer: строка\n- modality: строка." );
}
function handleClick_3() {
    smoothURL('/api/models/1')
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