<template>
    <Dialog
      v-if="currentState !== ImportState.NoOperation"
      ref="importDialog"
      :cancellable="currentState !== ImportState.Importing">
      <div class="container">
        <!-- Importing -->
        <div  v-if="currentState === ImportState.Importing"
              class="state-importing">
          <font-awesome-icon icon="spinner" spin />
          <h1>Importing...</h1>
        </div>
        <!-- Fail --> 
        <div  v-else-if="currentState === ImportState.FailedToImport"
              class="state-failed">
          <h1 class="header">Failed to import</h1>
          
          <div v-if="error">Error details:</div>
          <div v-if="error" class="error-details">({{ error }})</div>
          <div v-if="fileContent">File content was:</div>
          <textarea v-if="fileContent" v-model="fileContent"
                    readonly class="file-content" />
        </div>
        <!-- Success -->
        <div  v-else-if="currentState === ImportState.SuccessfullyImported"
              class="state-success">
          <h1 class="header">Successfully imported.</h1>
          <TheImportReport v-if="report" :report="report" />
          <div v-else>Something went wrong with report 😢</div>
        </div>
      </div>
    </Dialog>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import Dialog from '@/presentation/components/Shared/Dialog.vue';
import { StatefulVue } from '@/presentation/components/Shared/StatefulVue';
import { IImportCompleteEvent, IImportStartEvent } from '@/application/Context/ObservableImporter/IObservableImporter';
import { ImportReportViewModel, IImportReportViewModel } from './ImportReportViewModel';
import TheImportReport from './TheImportReport.vue';

enum ImportState { NoOperation, Importing, SuccessfullyImported, FailedToImport }
@Component({
  components: {
    Dialog,
    TheImportReport,
  },
})
export default class TheImportDialog extends StatefulVue {
  public fileContent: string;
  public currentState: ImportState = ImportState.NoOperation;
  public ImportState = ImportState; // Make it accessible from the view
  public error: string;
  public report: IImportReportViewModel;

  public async mounted() {
    const context = await this.getCurrentContext();
    this.events.register(
      context.importer.importStarted.on((event) => {
        this.onImportStarted(event);
      }),
      context.importer.importCompleted.on(async (event) => {
        this.onImportCompleted(event);
      }),
    );
  }

  public onImportStarted(event: IImportStartEvent) {
    if (this.currentState === ImportState.Importing) {
      throw new Error('Already importing');
    }
    this.currentState = ImportState.Importing;
    this.fileContent = event.data;
    this.$nextTick(async () => {
      (this.$refs.importDialog as any).show();
    });
  }
  public onImportCompleted(event: IImportCompleteEvent) {
    if (this.currentState === ImportState.SuccessfullyImported || this.currentState === ImportState.FailedToImport) {
      throw new Error('Already completed');
    }
    this.report = event.success ? new ImportReportViewModel(event.details) : undefined;
    this.currentState = event.success ? ImportState.SuccessfullyImported : ImportState.FailedToImport;
    this.error = event.error;
  }
  
  public async beginImporting(fileContent: string) {
    const context = await this.getCurrentContext();
    context.importer.beginImporting(fileContent);
  }

  protected handleCollectionState(): void {
    return;
  }
}
</script>

<style scoped lang="scss">
@use "@/presentation/assets/styles/main" as *;

.container {
  display: flex;
  flex-direction: column;
  flex: 1;

  textarea {
      resize: none;
  }
  .state {
    &-importing {
      display: flex;
      flex-direction: row;
      align-items: center;
      > *:not(:first-child) {
        margin-left: 0.5em;
      }
    }
    &-failed {
      .header {
        color: $color-error;
      }
      display: flex;
      flex-direction: column;
      .error-details {
        overflow-y: auto;
        max-height: 200px;
        color: $color-error;
      }
      .file-content {
        width: 100%;
        height: 200px;
      }
      > *:not(:first-child) {
        margin-top: 0.5em;
      }
    }
    &-success {
      .header {
        color: $color-secondary-dark; // TODO: Or success color? Or make color secondary darker?
      }
      display: flex;
      flex-direction: column;
      > *:not(:first-child) {
        margin-top: 0.5em;
      }
    }
  }
}

</style>
