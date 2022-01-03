import { IApplicationContext, IReadOnlyApplicationContext } from '@/application/Context/IApplicationContext';
import { SelectedScript } from '@/application/Context/State/Selection/SelectedScript';
import { ICategoryCollection } from '@/domain/ICategoryCollection';
import { IPersistableState, IPersistableScript } from '@/application/Context/ImportExport/IPersistableState';
import { PersistableStateBuilder } from '../PersistableStateBuilder';
import { IPartialStateImportExport } from './IPartialStateImportExport';
import { StateImportReportBuilder } from '../IStateImportReport';

export class ScriptsImportExport implements IPartialStateImportExport  {
    public import(model: IPersistableState, context: IApplicationContext, reporter: StateImportReportBuilder): void {
        const state = context.state;
        const selectedScripts = findSelectedScripts(model.scripts, state.collection, reporter);
        if (selectedScripts.length > 0) {
            state.selection.selectOnly(selectedScripts);
        }
    }
    public export(context: IReadOnlyApplicationContext, builder: PersistableStateBuilder): void {
        for (const script of context.state.selection.selectedScripts) {
            builder.addScript(script.id, script.revert);
        }
    }
}

function findSelectedScripts(
    storedScripts: readonly IPersistableScript[],
    collection: ICategoryCollection,
    reporter: StateImportReportBuilder): SelectedScript[] {
    const scripts = new Array<SelectedScript>();
    for (const storedScript of storedScripts) {
        const script = collection.findScript(storedScript.id);
        if (!script) {
            reporter.reportMissing(storedScript.id, storedScript.revert);
        } else {
            const selectedScript = new SelectedScript(script, storedScript.revert);
            scripts.push(selectedScript);
            reporter.reportImported(selectedScript);
        }
    }
    return scripts;
}
