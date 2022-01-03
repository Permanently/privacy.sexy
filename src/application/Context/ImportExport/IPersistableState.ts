import { OperatingSystem } from '@/domain/OperatingSystem';

export interface IPersistableState {
    readonly platform: OperatingSystem;
    readonly appVersion: string;
    readonly scripts: readonly IPersistableScript[];
}

export interface IPersistableScript {
    readonly id: string;
    readonly revert: boolean;
}
