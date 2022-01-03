import { IPersistableState, IPersistableScript } from '@/application/Context/ImportExport/IPersistableState';
import { OperatingSystem } from '@/domain/OperatingSystem';

export class PersistableStateBuilder {
    private platform?: OperatingSystem;
    private appVersion?: string;
    private scripts = new Array<IPersistableScript>();
    public setPlatform(platform: OperatingSystem): void {
        if (this.platform !== undefined) {
            throw new Error(`platform is already set to "${OperatingSystem[platform]}"`);
        }
        this.platform = platform;
    }
    public addScript(id: string, isReverted: boolean): void {
        this.scripts.push({ id, revert: isReverted });
    }
    public setAppVersion(appVersion: string): void {
        this.appVersion = appVersion;
    }
    public build(): IPersistableState {
        if (this.platform === undefined) {
            throw new Error('platform is not set');
        }
        if (!this.scripts.length) {
            throw new Error('no script is selected');
        }
        if (!this.appVersion) {
            throw new Error('undefined appVersion');
        }
        return {
            platform: this.platform,
            scripts: this.scripts,
            appVersion: this.appVersion,
        };
    }
}
