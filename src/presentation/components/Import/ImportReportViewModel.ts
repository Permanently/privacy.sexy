// TODO: Unit tests

import { IStateImportReport } from '@/application/Context/ImportExport/State/IStateImportReport';
import { OperatingSystem } from '@/domain/OperatingSystem';

export interface IImportReportViewModel {
    readonly os: OperatingSystem;
    scripts: readonly IImportedScriptViewModel[];
    missingScripts: readonly IMissingScriptViewModel[];
    toString(): string;
}

export interface IImportedScriptViewModel {
    readonly name: string;
    readonly revert: boolean;
}

export interface IMissingScriptViewModel {
    readonly id: string;
    readonly revert: boolean;
}

export class ImportReportViewModel implements IImportReportViewModel {
    public readonly os: OperatingSystem;
    public scripts: readonly IImportedScriptViewModel[];
    public missingScripts: readonly IMissingScriptViewModel[];
    constructor(report: IStateImportReport) {
        if (!report) {
            throw new Error('undefined report');
        }
        this.os = report.platform;
        this.missingScripts = report.missingScripts.map((script) => ({
            id: script.scriptId,
            revert: script.revert,
        })),
        this.scripts = report.importedScripts.map((script) => ({
            name: script.script.name,
            revert: script.revert,
        }));
    }
    public toString(): string {
        let out = '';
        out += `Platform: ${OperatingSystem[this.os]}\n`;
        if (this.scripts.length) {
            out += 'Imported scripts:\n';
            for (const script of this.scripts) {
                out += `\t- ${script.revert ? '(revert) ' : ''}${script.name}\n`;
            }
        }
        if (this.missingScripts.length) {
            out += 'Scripts removed since your export:\n';
            for (const script of this.missingScripts) {
                out += `\t- ${script.revert ? '(revert) ' : ''}${script.id}\n`;
            }
        }
        return out;
    }
}
