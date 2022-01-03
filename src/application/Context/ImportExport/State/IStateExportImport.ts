import { IApplicationContext, IReadOnlyApplicationContext } from '@/application/Context/IApplicationContext';
import { IPersistableState } from '@/application/Context/ImportExport/IPersistableState';
import { IStateImportReport } from './IStateImportReport';

export interface IStateExportImport {
    import(context: IApplicationContext, model: IPersistableState): IStateImportReport;
    export(context: IReadOnlyApplicationContext): IPersistableState;
}
