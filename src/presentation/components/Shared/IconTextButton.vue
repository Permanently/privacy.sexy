<template>
  <span class="button">
      <span @click="onClicked()">{{ label }}</span>
      <font-awesome-icon class="icon" :icon="['fas', iconName]"  />
  </span>
</template>

<script lang="ts">
import { Component, Emit, Vue, Prop } from 'vue-property-decorator';
import Responsive from '@/presentation/components/Shared/Responsive.vue';
import { NonCollapsing } from '@/presentation/components/Scripts/View/Cards/NonCollapsingDirective';

@Component({
  components: {
    Responsive,
  },
  directives: { NonCollapsing },
})
export default class IconTextButton extends Vue {
  @Prop() public label!: string;
  @Prop() public iconName!: string;
  @Emit('click')
  public onClicked(): void {
      return;
  }
}

</script>

<style scoped lang="scss">
@use "@/presentation/assets/styles/main" as *;

.button {
    @include clickable;
    color: $color-primary; // To make it easy to understand that it's clickable without hover
    display: flex;
    flex-direction: row;
    align-items: center;
    .icon {
        margin-left: 0.5em;
    }
}
</style>
