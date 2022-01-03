import { IPersistableState } from '@/application/Context/ImportExport/IPersistableState';
import { ExportVersion } from '../ExportVersion';
import { IPipeContext } from '../IPipeContext';

export interface IImportContext extends IPipeContext {
    readonly rawFileData: string;
    readonly incomingDataToProcess: string | undefined;
    readonly model: IPersistableState | undefined;
    setVersion(version: ExportVersion): void;
    setNextData(data: string): void;
    setModel(model: IPersistableState): void;
}
