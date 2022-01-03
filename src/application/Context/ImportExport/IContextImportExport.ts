import { IApplicationContext, IReadOnlyApplicationContext } from '@/application/Context/IApplicationContext';
import { IStateImportReport } from './State/IStateImportReport';

export interface IContextImportExport extends IContextExporter, IContextImporter {

}

export interface IContextExporter {
    export(context: IReadOnlyApplicationContext): string;
}

export interface IContextImporter {
    import(fileContent: string, context: IApplicationContext): IStateImportReport;
}
