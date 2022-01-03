import { ExportVersion } from '../../../Context/ExportVersion';

export interface ITextGrouper {
    join(...groups: readonly string[]): string;
    split(grouped: string, version: ExportVersion): string[];
}
