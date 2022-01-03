import { IPersistableState } from '@/application/Context/ImportExport/IPersistableState';
import { ExportVersion } from '../../Context/ExportVersion';
import { IModelSerializer } from './IModelSerializer';

export class JsonSerializer implements IModelSerializer {
    public stringify(state: IPersistableState): string {
        return JSON.stringify(state);
    }
    public parse(serialized: string, version: ExportVersion): IPersistableState {
        return JSON.parse(serialized) as IPersistableState;
    }
}
