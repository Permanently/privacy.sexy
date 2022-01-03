import { IPersistableState } from '@/application/Context/ImportExport/IPersistableState';
import { IPipeContext } from '../IPipeContext';
import { ExportVersion } from '../ExportVersion';

export interface IExportContext extends IPipeContext {
    readonly dataInProcessing: string | undefined;
    readonly model: IPersistableState;
    readonly version: ExportVersion;
    setDataInProcessing(data: string): void;
}
