import { IExportContext } from './IExportContext';

export interface IExportPipe {
    export(context: IExportContext): void;
}
