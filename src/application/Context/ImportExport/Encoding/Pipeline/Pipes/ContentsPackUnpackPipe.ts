import { IExportContext } from '../Context/Export/IExportContext';
import { IImportContext } from '../Context/Import/IImportContext';
import { ExportVersion } from '../Context/ExportVersion';
import { IEncodingPipe } from '../IEncodingPipe';

// import: splits the string and sets payload data and version
// export: merges payload data and version
export class ContentsPackUnpackPipe implements IEncodingPipe {
    public import(context: IImportContext): void {
        const contents = unpack(context.incomingDataToProcess);
        context.setNextData(contents.payload);
        const version = ExportVersion.fromSerializedString(contents.version);
        context.setVersion(version);
    }
    public export(context: IExportContext): void {
        const contents = pack({
            payload: context.dataInProcessing,
            version: context.version.serialize(),
        });
        context.setDataInProcessing(contents);
    }
}

interface IPacketContents {
    readonly version: string;
    readonly payload: string;
}
const Separator: string = '|';

function unpack(packed: string) {
    const versionEndPosition = packed.indexOf(Separator);
    if (versionEndPosition === -1) {
        throw new Error(`could not find version separator "${Separator}"`);
    }
    const version = packed.substring(0, versionEndPosition);
    const payload = packed.substring(versionEndPosition + Separator.length, packed.length);
    return { version, payload };
}

function pack(contents: IPacketContents): string {
    return contents.version + Separator + contents.payload;
}

