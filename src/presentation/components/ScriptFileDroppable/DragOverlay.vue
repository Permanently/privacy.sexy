<template>
    <div class="overlay">
        <div>Drop your script file</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DragOverlay extends Vue {
}
</script>

<style scoped lang="scss">
@use "@/presentation/assets/styles/main" as *;

.overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    background-color: rgba($color-primary-darkest, .5);
    color: $color-on-primary;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    > div {
        border: 2px dashed $color-primary-light;
        background-color: $color-primary-dark;
        padding: 40px;
        font-size: 30px;
        border-radius: 30px;
        pointer-events: none;
    }
}
</style>
