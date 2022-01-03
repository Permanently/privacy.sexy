<template>
  <IconTextButton
    label="Import an existing script"
    iconName="file-import"
    @click="importFromFile()"
  />
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Responsive from '@/presentation/components/Shared/Responsive.vue';
import { NonCollapsing } from '@/presentation/components/Scripts/View/Cards/NonCollapsingDirective';
import { OpenFileDialog } from '@/presentation/dialogs/OpenFileDialog';
import { StatefulVue } from '@/presentation/components/Shared/StatefulVue';
import IconTextButton from '@/presentation/components/Shared/IconTextButton.vue';

@Component({
  components: {
    Responsive,
    IconTextButton,
  },
  directives: { NonCollapsing },
})
export default class ImportButton extends StatefulVue {
  public async importFromFile(): Promise<void> {
    const content = await OpenFileDialog.openFileContent();
    const context = await this.getCurrentContext();
    context.importer.beginImporting(content);
  }
  protected handleCollectionState(): void {
    return;
  }
}

</script>

<style scoped lang="scss">

</style>
