import { IApplicationContext } from '../../IApplicationContext';
import { IPersistableState } from '@/application/Context/ImportExport/IPersistableState';
import { PlatformImportExport } from './Partials/PlatformImportExport';
import { ScriptsImportExport } from './Partials/ScriptsImportExport';
import { IPartialStateImportExport } from './Partials/IPartialStateImportExport';
import { PersistableStateBuilder } from './PersistableStateBuilder';
import { IStateExportImport } from './IStateExportImport';
import { IStateImportReport, StateImportReportBuilder } from './IStateImportReport';

export class StateImportExport implements IStateExportImport {
    private readonly partials: readonly IPartialStateImportExport[] = [
        new PlatformImportExport(),
        new ScriptsImportExport(),
    ];
    public import(context: IApplicationContext, model: IPersistableState): IStateImportReport {
        const builder = new StateImportReportBuilder();
        for (const handler of this.partials) {
            handler.import(model, context, builder);
        }
        return builder.build();
    }
    public export(context: IApplicationContext): IPersistableState {
        const builder = new PersistableStateBuilder();
        for (const handler of this.partials) {
            handler.export(context, builder);
        }
        return builder.build();
    }
}
