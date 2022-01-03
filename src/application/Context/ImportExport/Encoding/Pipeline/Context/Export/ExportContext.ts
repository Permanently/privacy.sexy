import { IPersistableState } from '@/application/Context/ImportExport/IPersistableState';
import { ExportVersion } from '../ExportVersion';
import { IExportContext } from './IExportContext';

export class ExportContext implements IExportContext {
    public dataInProcessing: string;
    constructor(public readonly model: IPersistableState, public readonly version: ExportVersion) {

    }
    public setDataInProcessing(data: string): void {
        this.dataInProcessing = data;
    }
}
