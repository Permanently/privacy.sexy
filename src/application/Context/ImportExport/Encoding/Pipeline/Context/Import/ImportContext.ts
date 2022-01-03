import { IPersistableState } from '@/application/Context/ImportExport/IPersistableState';
import { ExportVersion } from '../ExportVersion';
import { IImportContext } from './IImportContext';

export class ImportContext implements IImportContext {
    public version: ExportVersion | undefined;
    public incomingDataToProcess: string;
    public model: IPersistableState;
    constructor(public readonly rawFileData: string) {
    }
    public setNextData(data: string): void {
        this.incomingDataToProcess = data;
    }
    public setVersion(version: ExportVersion): void {
        this.version = version;
    }
    public setModel(model: IPersistableState): void {
        this.model = model;
    }
}
