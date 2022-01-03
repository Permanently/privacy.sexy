import { IApplicationContext } from '@/application/Context/IApplicationContext';
import { IReadOnlyUserSelection } from '@/application/Context/State/Selection/IUserSelection';
import { IPersistableState } from '../../IPersistableState';
import { StateImportReportBuilder } from '../IStateImportReport';
import { PersistableStateBuilder } from '../PersistableStateBuilder';
import { IPartialStateImportExport } from './IPartialStateImportExport';

export class AppVersionImportExport implements IPartialStateImportExport  {
    public import(model: IPersistableState, context: IApplicationContext, reporter: StateImportReportBuilder): void {
        reporter.reportVersion(model.appVersion);
    }
    public export(selection: IReadOnlyUserSelection, builder: PersistableStateBuilder): void {
        // const currentVersion = ApplicationFactory.Current.getApp(); // TODO: How to do this?
        builder.setAppVersion('0.1.1.');
    }
}
