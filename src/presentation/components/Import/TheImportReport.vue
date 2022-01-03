<template>
    <div class="report">
        <div v-if="report.missingScripts.length > 0">
            Some scripts were removed since your export.
            Updates sometimes removes existing scripts, sometimes adds new ones.
            You can check script pool again, and <a :href="releaseUrl">release notes</a> for updates.
        </div>
        <!-- Platform -->
        <div><span class="label">Platform:</span> <OperatingSystemName :os="report.os" /></div>
        <div class="scripts-container">
            <!-- Imported scripts -->
            <div>
                <div class="label">Imported scripts ({{report.scripts.length}}):</div>
                <ul class="script-list">
                    <li v-for="script of report.scripts" v-bind:key="script.name"
                        class="script">
                        <div class="script__name">{{ script.name }}</div>
                        <div class="script__revert" v-if="script.revert">(revert)</div>
                    </li>
                </ul>
            </div>
            <!-- Missing scripts -->
            <div class="error" v-if="report.missingScripts.length > 0">
                <div class="label">Scripts removed since your export ({{report.missingScripts.length}}):</div>
                <ul class="script-list">
                    <li v-for="script of report.missingScripts" v-bind:key="script.id"
                        class="script">
                        <div class="script__name">{{ script.id }}</div>
                        <div class="script__revert" v-if="script.revert">(revert)</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="save-file-button">
            <IconTextButton
                @click="saveAsFile"
                iconName="save"
                label="Save import report as text file" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IconTextButton from '@/presentation/components/Shared/IconTextButton.vue';
import OperatingSystemName from '@/presentation/components/Shared/OperatingSystemName.vue';
import { IImportReportViewModel } from './ImportReportViewModel';
import { FileType, SaveFileDialog } from '@/presentation/dialogs/SaveFileDialog';
import { injectConfettiExplosion } from './Confetti/ConfettiInjector';
import { ApplicationFactory } from '@/application/ApplicationFactory';

@Component({
  components: {
    OperatingSystemName,
    IconTextButton,
  },
})
export default class TheImportReport extends Vue {
  @Prop() public report: IImportReportViewModel;
  public releaseUrl: string = '';

  public async mounted() {
    if (this.report.missingScripts?.length === 0) {
    injectConfettiExplosion();
    }
    const app = await ApplicationFactory.Current.getApp();
    this.releaseUrl = app.info.releaseUrl; //TODO: Add generic relases url instead of specific relaese, first merge branch urls
  }
  public saveAsFile() {
      SaveFileDialog.saveFile(this.report.toString(), 'import-logs.txt', FileType.TextFile);
  }
}
</script>

<style scoped lang="scss">
@use "@/presentation/assets/styles/main" as *;

.report {
    display: flex;
    flex-direction: column;
    > *:not(:first-child) {
        margin-top: 0.5em;
    }
    width: 100%;
}
.scripts-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    > * {
        flex: 50%;
    }
}
.script-list {
    overflow-y: auto;
    max-height: 200px;
    margin-left: 0.5em;
    padding: 0;             // Remove default list identation
    list-style-type: none;  // Remove default list bullets
    .script {
        display: flex;
        flex-direction: row;
        &:before {
            content: '•';
            margin-right: 0.5em;
        }
        &__name {
            flex: 1;
        }
        &__revert {
            color: $color-secondary-dark;
        }
    }
}
.label {
    font-weight: bold;
}
.error {
    color: $color-error;
}
.save-file-button {
    align-self: flex-end;
}
</style>