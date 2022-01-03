import { IApplicationContext } from '@/application/Context/IApplicationContext';
import { StateImportExport } from './State/StateImportExport';
import { ModelEncodeDecode } from './Encoding/ModelEncodeDecode';
import { IStateExportImport } from './State/IStateExportImport';
import { IModelEncodeDecode } from './Encoding/IModelEncodeDecode';
import { IContextImportExport } from './IContextImportExport';
import { IStateImportReport } from './State/IStateImportReport';
import { IReadOnlyApplicationContext } from '../IApplicationContext';

export class SelectionImportExport implements IContextImportExport {
    constructor(
        private readonly importExport: IStateExportImport = new StateImportExport(),
        private readonly encodeDecode: IModelEncodeDecode = new ModelEncodeDecode()) {

    }
    public export(context: IReadOnlyApplicationContext): string {
        const model = this.importExport.export(context);
        const encoded = this.encodeDecode.encode(model);
        return encoded;
    }
    public import(fileContent: string, context: IApplicationContext): IStateImportReport {
        const model = this.encodeDecode.decode(fileContent);
        const report = this.importExport.import(context, model);
        return report;
    }
}
