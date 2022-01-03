import { ExportVersion } from '../../Context/ExportVersion';
import { IPersistableState } from '@/application/Context/ImportExport/IPersistableState';

export interface IModelSerializer {
    stringify(state: IPersistableState): string;
    parse(serialized: string, version: ExportVersion): IPersistableState;
}
