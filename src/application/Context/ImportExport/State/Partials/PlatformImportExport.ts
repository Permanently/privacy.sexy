import { IApplicationContext } from '@/application/Context/IApplicationContext';
import { IPersistableState } from '@/application/Context/ImportExport/IPersistableState';
import { PersistableStateBuilder } from '../PersistableStateBuilder';
import { IPartialStateImportExport } from './IPartialStateImportExport';
import { StateImportReportBuilder } from '../IStateImportReport';
import { IReadOnlyApplicationContext } from '../../../IApplicationContext';

export class PlatformImportExport implements IPartialStateImportExport  {
    public import(model: IPersistableState, context: IApplicationContext, reporter: StateImportReportBuilder): void {
        context.changeContext(model.platform);
        reporter.reportPlatform(model.platform);
    }
    public export(context: IReadOnlyApplicationContext, builder: PersistableStateBuilder): void {
        builder.setPlatform(context.state.os);
    }
}
