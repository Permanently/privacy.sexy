import { IApplicationContext, IApplicationContextChangedEvent } from '@/application/Context/IApplicationContext';
import { IObservableImporter } from '@/application/Context/ObservableImporter/IObservableImporter';
import { ICategoryCollectionState } from '@/application/Context/State/ICategoryCollectionState';
import { IApplication } from '@/domain/IApplication';
import { OperatingSystem } from '@/domain/OperatingSystem';
import { IEventSource } from '@/infrastructure/Events/IEventSource';
import { ApplicationStub } from './ApplicationStub';

export class ApplicationContextStub implements IApplicationContext {
    public app: IApplication = new ApplicationStub();
    public state: ICategoryCollectionState;
    public contextChanged: IEventSource<IApplicationContextChangedEvent>;
    public importer: IObservableImporter;
    public changeContext(os: OperatingSystem): void {
        throw new Error('Method not implemented.');
    }

    public withState(state: ICategoryCollectionState): ApplicationContextStub {
        this.state = state;
        return this;
    }

    public withApplication(application: IApplication): ApplicationContextStub {
        this.app = application;
        return this;
    }
}
