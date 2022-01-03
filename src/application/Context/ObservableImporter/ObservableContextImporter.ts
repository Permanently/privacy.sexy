import { EventSource } from '@/infrastructure/Events/EventSource';
import { IImportCompleteEvent, IImportStartEvent, IObservableImporter } from './IObservableImporter';
import { IApplicationContext } from '../IApplicationContext';
import { IContextImporter } from '@/application/Context/ImportExport/IContextImportExport';
import { SelectionImportExport } from '@/application/Context/ImportExport/ContextImportExport';

export class ObservableContextImporter implements IObservableImporter {
    public readonly importStarted = new EventSource<IImportStartEvent>();
    public readonly importCompleted = new EventSource<IImportCompleteEvent>();
    public isImporting: boolean;
    constructor(
        private readonly context: IApplicationContext,
        private readonly importer: IContextImporter = new SelectionImportExport()) {

    }
    public beginImporting(data: string): void {
        if (this.isImporting) {
            throw new Error('already importing');
        }
        this.importStarted.notify({
            data,
        });
        this.isImporting = true;
        try {
            const report = this.importer.import(data, this.context);
            this.importCompleted.notify({
                success: true,
                details: report,
            });
        } catch (err) {
            this.importCompleted.notify({
                success: false,
                error: stringifyError(err),
            });
        } finally {
            this.isImporting = false;
        }
    }
}

function stringifyError(error: any): string | undefined {
    if (!error) {
        return undefined;
    }
    const propertyNames = Object.getOwnPropertyNames(error);
    if (propertyNames.length === 0) {
        return undefined;
    }
    const text = JSON.stringify(error, propertyNames);
    return text;
}
