import { IApplicationContext, IApplicationContextChangedEvent } from './IApplicationContext';
import { ICategoryCollectionState } from './State/ICategoryCollectionState';
import { CategoryCollectionState } from './State/CategoryCollectionState';
import { IApplication } from '@/domain/IApplication';
import { OperatingSystem } from '@/domain/OperatingSystem';
import { ICategoryCollection } from '@/domain/ICategoryCollection';
import { EventSource } from '@/infrastructure/Events/EventSource';
import { assertInRange } from '@/application/Common/Enum';
import { IObservableImporter } from './ObservableImporter/IObservableImporter';
import { ObservableContextImporter } from './ObservableImporter/ObservableContextImporter';

type StateMachine = Map<OperatingSystem, ICategoryCollectionState>;

export class ApplicationContext implements IApplicationContext {
    public readonly contextChanged = new EventSource<IApplicationContextChangedEvent>();
    public readonly importer: IObservableImporter;
    public collection: ICategoryCollection;
    public currentOs: OperatingSystem;

    public get state(): ICategoryCollectionState {
        return this.states[this.collection.os];
    }
    private readonly states: StateMachine;

    public constructor(
        public readonly app: IApplication,
        initialContext: OperatingSystem) {
        validateApp(app);
        assertInRange(initialContext, OperatingSystem);
        this.states = initializeStates(app, this);
        this.changeContext(initialContext);
        this.importer = new ObservableContextImporter(this);
    }

    public changeContext(os: OperatingSystem): void {
        if (this.currentOs === os) {
            return;
        }
        this.collection = this.app.getCollection(os);
        if (!this.collection) {
            throw new Error(`os "${OperatingSystem[os]}" is not defined in application`);
        }
        const event: IApplicationContextChangedEvent = {
            newState: this.states[os],
            oldState: this.states[this.currentOs],
        };
        this.contextChanged.notify(event);
        this.currentOs = os;
    }
}

function validateApp(app: IApplication) {
    if (!app) {
        throw new Error('undefined app');
    }
}

function initializeStates(app: IApplication, context: IApplicationContext): StateMachine {
    const machine = new Map<OperatingSystem, ICategoryCollectionState>();
    for (const collection of app.collections) {
        machine[collection.os] = new CategoryCollectionState(collection, context);
    }
    return machine;
}
