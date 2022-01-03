import { ExportVersion } from '../../../../Context/ExportVersion';

export interface IPartialSerializer<T> {
    stringify(data: T): string;
    parse(serialized: string, version: ExportVersion): T;
}
