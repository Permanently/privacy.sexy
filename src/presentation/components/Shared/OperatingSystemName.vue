<template>
  <span>{{ displayName }}</span>
</template>

<script lang="ts">
import { OperatingSystem } from '@/domain/OperatingSystem';
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class OperatingSystemName extends Vue {
    @Prop() public os: OperatingSystem;

    public get displayName() {
        return getOperatingSystemName(this.os);
    }
}

export function getOperatingSystemName(os: OperatingSystem): string {
    switch (os) {
        case OperatingSystem.Linux:
            return 'Linux';
        case OperatingSystem.macOS:
            return 'macOS';
        case OperatingSystem.Windows:
            return 'Windows';
        default:
            throw new Error(`Unsupported os: ${OperatingSystem[os]}`);
    }
}
</script>

<style scoped lang="scss">

</style>

