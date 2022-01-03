import { IPersistableState } from '@/application/Context/ImportExport/IPersistableState';

export interface IModelEncodeDecode {
    decode(text: string): IPersistableState;
    encode(model: IPersistableState): string;
}
