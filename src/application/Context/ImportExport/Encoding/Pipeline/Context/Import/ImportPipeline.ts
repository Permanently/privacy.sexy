import { IPersistableState } from '@/application/Context/ImportExport/IPersistableState';
import { ImportContext } from './ImportContext';
import { IImportPipe } from './IImportPipe';
import { PipelineRunner } from '../../PipelineRunner';

export class ImportPipeline extends PipelineRunner<IImportPipe> {
    constructor() {
        super();
    }

    public run(content: string): IPersistableState {
        const context = new ImportContext(content);
        this.runPipeline((pipe) => pipe.import(context));
        return context.model;
    }
}
