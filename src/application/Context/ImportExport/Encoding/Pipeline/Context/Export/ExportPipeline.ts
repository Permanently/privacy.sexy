import { IPersistableState } from '@/application/Context/ImportExport/IPersistableState';
import { PipelineRunner } from '../../PipelineRunner';
import { ExportVersion } from '../ExportVersion';
import { ExportContext } from './ExportContext';
import { IExportPipe } from './IExportPipe';

export class ExportPipeline extends PipelineRunner<IExportPipe> {
    public run(model: IPersistableState): string {
        const version = ExportVersion.getCurrentVersion();
        const context = new ExportContext(model, version);
        this.runPipeline((pipe) => pipe.export(context));
        return context.dataInProcessing;
    }
}
