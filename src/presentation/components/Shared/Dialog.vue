<template>
    <modal
        :name="name"
        :scrollable="true"
        :adaptive="true"
        :clickToClose="cancellable"
        height="auto">
    <div class="dialog">
      <div class="dialog__content">
        <slot></slot>
      </div>
      <div class="dialog__close-button" v-if="this.cancellable">
        <font-awesome-icon :icon="['fas', 'times']"  @click="close()"/>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Dialog extends Vue {
  private static idCounter = 0;

  @Prop({ default: true }) public cancellable!: boolean;
  public name = (++Dialog.idCounter).toString();

  public show(): void {
    this.$modal.show(this.name);
  }

  public close() {
    if (!this.cancellable) {
      return;
    }
    this.$modal.hide(this.name);
  }
}
</script>

<style scoped lang="scss">
@use "@/presentation/assets/styles/main" as *;

.dialog {
  color: $color-surface;
  font-family: $font-normal;
  display: flex;
  flex-direction: row;

  $inner-margin: 5%;

  &__content {
    color: $color-on-surface;
    width: 100%;
    margin: $inner-margin;
    max-height: 100vh;
    overflow-y: auto;
  }

  &__close-button {
    color: $color-primary-dark;
    width: auto;
    font-size: 1.5em;
    margin-right: 0.25em;
    margin-left: -$inner-margin;
    align-self: flex-start;
    cursor: pointer;
    &:hover {
      color: $color-primary;
    }
  }
}
</style>
