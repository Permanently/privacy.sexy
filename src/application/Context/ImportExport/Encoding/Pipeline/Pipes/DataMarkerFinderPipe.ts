import { IEncodingPipe } from '../IEncodingPipe';
import { IExportContext } from '../Context/Export/IExportContext';
import { IImportContext } from '../Context/Import/IImportContext';

// TODO: Split to: PackUnpack, MarkFind,
export class DataMarkerFinderPipe implements IEncodingPipe {
    public import(context: IImportContext): void {
        const data = findMarkedData(context.rawFileData);
        context.setNextData(data);
    }
    public export(context: IExportContext): void {
        const exportData = markData(context.dataInProcessing);
        context.setDataInProcessing(exportData);
    }
}

const DataStart = '-----BEGIN EXPORT DATA-----';
const DataEnd = '-----END EXPORT DATA-----';
function findMarkedData(fileContent: string): string {
    const regex = createImportExportDataMatcher();
    const matches = Array.from(fileContent.matchAll(regex));
    if (!matches) {
        throw new Error('could not find import data');
    }
    if (matches.length > 1) {
        throw new Error('multiple import data matches');
    }
    const match = matches[0];
    if (match.length !== 2) {
        throw new Error('could not extract content');
    }
    return match[1];
}
function createImportExportDataMatcher(): RegExp {
    return new RegExp(DataStart + '(.+?)' + DataEnd, 'g');
}
function markData(data: string) {
    return DataStart + data + DataEnd;
}
