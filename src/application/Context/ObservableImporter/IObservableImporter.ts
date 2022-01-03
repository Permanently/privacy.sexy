import { IEventSource } from '@/infrastructure/Events/IEventSource';
import { IStateImportReport } from '@/application/Context/ImportExport/State/IStateImportReport';

export interface IObservableImporter {
    readonly importStarted: IEventSource<IImportStartEvent>;
    readonly importCompleted: IEventSource<IImportCompleteEvent>;
    readonly isImporting: boolean;

    beginImporting(data: string): void;
}

export interface IImportStartEvent {
    readonly data: string;
}

export interface IImportCompleteEvent {
    readonly success: boolean;
    readonly details?: IStateImportReport;
    readonly error?: string;
}
