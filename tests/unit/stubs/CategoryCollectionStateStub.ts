import { IApplicationCode } from '@/application/Context/State/Code/IApplicationCode';
import { IUserFilter } from '@/application/Context/State/Filter/IUserFilter';
import { ICategoryCollectionState } from '@/application/Context/State/ICategoryCollectionState';
import { OperatingSystem } from '@/domain/OperatingSystem';
import { CategoryCollectionStub } from './CategoryCollectionStub';
import { UserSelectionStub } from './UserSelectionStub';
import { UserFilterStub } from './UserFilterStub';
import { ApplicationCodeStub } from './ApplicationCodeStub';
import { ICategoryCollection } from '@/domain/ICategoryCollection';
import { IUserSelection } from '@/application/Context/State/Selection/IUserSelection';

export class CategoryCollectionStateStub implements ICategoryCollectionState {
    public readonly code: IApplicationCode = new ApplicationCodeStub();
    public readonly filter: IUserFilter = new UserFilterStub();
    public os = OperatingSystem.Windows;
    public collection: ICategoryCollection = new CategoryCollectionStub();
    public selection: IUserSelection = new UserSelectionStub();

    public withCollection(collection: ICategoryCollection) {
        this.collection = collection;
        return this;
    }
    public withSelection(selection: IUserSelection) {
        this.selection = selection;
        return this;
    }
    public withOs(os: OperatingSystem) {
        this.os = os;
        return this;
    }
}
