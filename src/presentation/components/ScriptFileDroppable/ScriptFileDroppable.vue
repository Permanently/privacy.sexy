<template>
  <div
    @dragover="this.dragOver"
    @dragenter="this.dragEnter"
    @dragleave="this.dragLeave"
    @drop="this.drop">
      <slot></slot>
      <DragOverlay v-if="this.isDragging" />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import DragOverlay from './DragOverlay.vue';
import { StatefulVue } from '@/presentation/components/Shared/StatefulVue';

@Component({
  components: {
    DragOverlay,
  },
})
export default class ScriptFileDroppable extends StatefulVue {
  public isDisabled = false;
  public isDragging = false;

  private enterTarget: EventTarget;
  public async mounted() {
    const context = await this.getCurrentContext();
    this.events.register(
      context.importer.importStarted.on((event) => {
        this.isDisabled = true;
      }),
      context.importer.importCompleted.on((event) => {
        this.isDisabled = false;
      }),
    );
  }
  public dragEnter(event: DragEvent) {
    if (this.isDisabled) {
      return;
    }
    this.enterTarget = event.target;
    this.isDragging = true;
  }
  public dragOver(event: DragEvent) {
    event.preventDefault(); // Allows firing drop event
  }
  public dragLeave(event: DragEvent) {
    if (this.isDisabled) {
      return;
    }
    if (this.enterTarget === event.target) { // Only if the two target are equal it means the drag has left the window
        this.isDragging = false;
    }
  }
  public async drop(event: DragEvent) {
    event.preventDefault(); // Cancel browser from opening the file
    if (this.isDisabled) {
      return;
    }
    this.isDragging = false;
    if (event.dataTransfer.files.length > 1) {
      // Can only drop single file
      return;
    }
    const file = event.dataTransfer.files[0];
    const content = await file.text();
    await this.importImportFile(content);
  }
  protected handleCollectionState(): void {
    return;
  }
  private async importImportFile(fileContent: string) {
    const context = await this.getCurrentContext();
    context.importer.beginImporting(fileContent);
  }
}
</script>

<style scoped lang="scss">
@use "@/presentation/assets/styles/main" as *;

</style>
