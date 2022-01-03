import pako from 'pako';
import { IExportContext } from '../Context/Export/IExportContext';
import { IImportContext } from '../Context/Import/IImportContext';
import { IEncodingPipe } from '../IEncodingPipe';

export class CompressDecompressPipe implements IEncodingPipe {
    public import(context: IImportContext): void {
        const decompressed = decompressText(context.incomingDataToProcess);
        context.setNextData(decompressed);
    }
    public export(context: IExportContext): void {
        const compressed = compressText(context.dataInProcessing);
        context.setDataInProcessing(compressed);
    }
}

function compressText(text: string): string {
    return pako.deflate(text, {to: 'string'});
}

function decompressText(compressedText: string): string {
    return pako.inflate(compressedText, {to: 'string'});
}
