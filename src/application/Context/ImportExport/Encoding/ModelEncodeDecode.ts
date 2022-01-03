import { IPersistableState } from '@/application/Context/ImportExport/IPersistableState';
import { SerializeDeserializePipe } from './Pipeline/Pipes/Serialization/SerializeDeserializePipe';
import { EncodeDecodePipe } from './Pipeline/Pipes/EncodeDecodePipe';
import { CompressDecompressPipe } from './Pipeline/Pipes/CompressDecompressPipe';
import { ContentsPackUnpackPipe } from './Pipeline/Pipes/ContentsPackUnpackPipe';
import { DataMarkerFinderPipe } from './Pipeline/Pipes/DataMarkerFinderPipe';
import { IModelEncodeDecode } from './IModelEncodeDecode';
import { ImportPipeline } from './Pipeline/Context/Import/ImportPipeline';
import { ExportPipeline } from './Pipeline/Context/Export/ExportPipeline';
import { MinimalSerializer } from './Pipeline/Pipes/Serialization/MinimalSerializer/MinimalSerializer';

/*
    | Pipeline                              | 608 selected scripts  | 26 selected scripts   |
    | ------------------------------------- | --------------------- | --------------------- |
    | MinimalSerialization                  | 22 3381   characters  | 906   characters      |
    | Encode+Compress+MinimalSerialization  | 9 975     characters  | 651   characters      |
    | JsonSerialization                     | 37 032    characters  | 1533  characters      |
    | Encode+Compress+JsonSerialization     | 10 365    characters  | 743   characters      |
*/
export class ModelEncodeDecode implements IModelEncodeDecode {
    public decode(text: string): IPersistableState {
        return new ImportPipeline()
            // Find - Find the export string in a file mixed with other text
            .withPipe(new DataMarkerFinderPipe())
            // Unpack - Separate and set version and payload string
            .withPipe(new ContentsPackUnpackPipe())
            // Decode
            .withPipe(new EncodeDecodePipe())
            // Decompress
            .withPipe(new CompressDecompressPipe())
            // Deserialize
            .withPipe(new SerializeDeserializePipe(new MinimalSerializer()))
            // .withPipe(new SerializeDeserializePipe(new JsonSerializer())) // Here for benchmarking
            .run(text);
    }
    public encode(model: IPersistableState): string {
        return new ExportPipeline()
            // Serialize - Stringifies the model
            .withPipe(new SerializeDeserializePipe(new MinimalSerializer()))
            // .withPipe(new SerializeDeserializePipe(new JsonSerializer())) // Here for benchmarking
            // Compress
            .withPipe(new CompressDecompressPipe())
            // Encode
            .withPipe(new EncodeDecodePipe())
            // Pack - Creates a new string from version and the payload
            .withPipe(new ContentsPackUnpackPipe())
            // // Mark - Mark the data so it can be discoverable when mixed with other text
            .withPipe(new DataMarkerFinderPipe())
            .run(model);
    }
}
