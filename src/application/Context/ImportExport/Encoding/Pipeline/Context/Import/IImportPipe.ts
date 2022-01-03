import { IImportContext } from './IImportContext';

export interface IImportPipe {
    import(context: IImportContext): void;
}
