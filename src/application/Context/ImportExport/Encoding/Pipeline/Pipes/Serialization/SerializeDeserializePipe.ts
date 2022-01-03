import { IExportContext } from '../../Context/Export/IExportContext';
import { IImportContext } from '../../Context/Import/IImportContext';
import { IEncodingPipe } from '../../IEncodingPipe';
import { IModelSerializer } from './IModelSerializer';

export class SerializeDeserializePipe implements IEncodingPipe {
    constructor(private readonly serializer: IModelSerializer) {

    }
    public import(context: IImportContext): void {
        const parsed = this.serializer.parse(context.incomingDataToProcess, context.version);
        context.setModel(parsed);
    }
    public export(context: IExportContext): void {
        const stringified = this.serializer.stringify(context.model);
        context.setDataInProcessing(stringified);
    }
}
