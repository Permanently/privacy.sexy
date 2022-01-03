<template>
  <span class="url">
    <a :href="downloadUrl"
        v-bind:class="{
            'url__active': hasCurrentOsDesktopVersion && isCurrentOs,
            'url__inactive': hasCurrentOsDesktopVersion && !isCurrentOs,
          }">
            <OperatingSystemName :os="operatingSystem" />
    </a>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { Environment } from '@/application/Environment/Environment';
import { OperatingSystem } from '@/domain/OperatingSystem';
import { ApplicationFactory } from '@/application/ApplicationFactory';
import OperatingSystemName from '@/presentation/components/Shared/OperatingSystemName.vue';

@Component({
  components: { OperatingSystemName },
})
export default class DownloadUrlListItem extends Vue {
  @Prop() public operatingSystem!: OperatingSystem;

  public downloadUrl: string = '';
  public isCurrentOs: boolean = false;
  public hasCurrentOsDesktopVersion: boolean = false;

  public async mounted() {
      await this.onOperatingSystemChanged(this.operatingSystem);
  }

  @Watch('operatingSystem')
  public async onOperatingSystemChanged(os: OperatingSystem) {
    const currentOs = Environment.CurrentEnvironment.os;
    this.isCurrentOs = os === currentOs;
    this.downloadUrl = await this.getDownloadUrl(os);
    this.hasCurrentOsDesktopVersion = hasDesktopVersion(currentOs);
  }

  private async getDownloadUrl(os: OperatingSystem): Promise<string> {
    const context = await ApplicationFactory.Current.getApp();
    return context.info.getDownloadUrl(os);
  }
}

function hasDesktopVersion(os: OperatingSystem): boolean {
    return os === OperatingSystem.Windows
        || os === OperatingSystem.Linux
        || os === OperatingSystem.macOS;
}

</script>

<style scoped lang="scss">
.url {
    &__active {
        font-size: 1em;
    }
    &__inactive {
        font-size: 0.70em;
    }
}
</style>
