import { IExportContext } from '../Context/Export/IExportContext';

export interface IExportPipe {
    export(context: IExportContext): void;
}
