import { IExportContext } from '../Context/Export/IExportContext';
import { IImportContext } from '../Context/Import/IImportContext';
import { IEncodingPipe } from '../IEncodingPipe';

export class EncodeDecodePipe implements IEncodingPipe {
    public import(context: IImportContext): void {
        const decoded = base64Decode(context.incomingDataToProcess);
        context.setNextData(decoded);
    }
    public export(context: IExportContext): void {
        const encoded = base64Encode(context.dataInProcessing);
        context.setDataInProcessing(encoded);
    }
}

function base64Encode(data: string): string {
    return btoa(data);
}

function base64Decode(data: string): string {
    return atob(data);
}
