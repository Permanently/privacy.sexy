import { IApplicationContext } from '@/application/Context/IApplicationContext';
import { PersistableStateBuilder } from '@/application/Context/ImportExport/State/PersistableStateBuilder';
import { IPersistableState } from '@/application/Context/ImportExport/IPersistableState';
import { StateImportReportBuilder } from '../IStateImportReport';

export interface IPartialStateImporter {
    import(
        model: IPersistableState,
        context: IApplicationContext,
        reporter: StateImportReportBuilder): void;
}

export interface IPartialStateExporter {
    export(context: IApplicationContext, builder: PersistableStateBuilder): void;
}

export interface IPartialStateImportExport extends IPartialStateImporter, IPartialStateExporter {

}
