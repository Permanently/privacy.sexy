import { SelectedScript } from '@/application/Context/State/Selection/SelectedScript';
import { OperatingSystem } from '@/domain/OperatingSystem';

export interface IMissingScript {
    scriptId: string;
    revert: boolean;
}

export interface IStateImportReport {
    platform: OperatingSystem;
    missingScripts: readonly IMissingScript[];
    importedScripts: readonly SelectedScript[];
    appVersion: string;
}

export class StateImportReportBuilder {
    private platform?: OperatingSystem;
    private appVersion?: string;
    private missingScripts = new Array<IMissingScript>();
    private importedScripts = new Array<SelectedScript>();
    public reportPlatform(platform: OperatingSystem): void {
        if (this.platform) {
            throw Error('os already set');
        }
        this.platform = platform;
    }
    public reportMissing(scriptId: string, revertStatus: boolean): void {
        if (!scriptId) {
            throw Error('undefined scriptId');
        }
        this.missingScripts.push({ scriptId, revert: revertStatus});
    }
    public reportImported(script: SelectedScript): void {
        if (!script) {
            throw Error('undefined script');
        }
        this.importedScripts.push(script);
    }
    public reportVersion(appVersion: string): void {
        if (!appVersion) {
            throw Error('undefined appVersion');
        }
        this.appVersion = appVersion;
    }
    public build(): IStateImportReport {
        if (this.platform === undefined) {
            throw Error('undefined platform');
        }
        if (!this.appVersion) {
            throw Error('undefined appVersion');
        }
        if (this.missingScripts.length === 0 && this.importedScripts.length === 0) {
            throw new Error('no scripts were reported');
        }
        return {
            platform: this.platform,
            missingScripts: this.missingScripts,
            appVersion: this.appVersion,
            importedScripts: this.importedScripts,
        };
    }
}
