import { ICategoryCollection } from '@/domain/ICategoryCollection';
import { OperatingSystem } from '@/domain/OperatingSystem';
import { UserFilter } from './Filter/UserFilter';
import { IUserFilter } from './Filter/IUserFilter';
import { ApplicationCode } from './Code/ApplicationCode';
import { UserSelection } from './Selection/UserSelection';
import { ICategoryCollectionState } from './ICategoryCollectionState';
import { IApplicationCode } from './Code/IApplicationCode';
import { UserSelectionFacade } from './Selection/UserSelectionFacade';

export class CategoryCollectionState implements ICategoryCollectionState {
  public readonly os: OperatingSystem;

  public readonly code: IApplicationCode;

  public readonly selection: UserSelection;

  public readonly filter: IUserFilter;

  public constructor(
    public readonly collection: ICategoryCollection,
    selectionFactory = DefaultSelectionFactory,
    codeFactory = DefaultCodeFactory,
    filterFactory = DefaultFilterFactory,
  ) {
    this.selection = selectionFactory(collection, []);
    this.code = codeFactory(this.selection.scripts, collection.scripting);
    this.filter = filterFactory(collection);
    this.os = collection.os;
  }
}

export type CodeFactory = (
  ...params: ConstructorParameters<typeof ApplicationCode>
) => IApplicationCode;

const DefaultCodeFactory: CodeFactory = (...params) => new ApplicationCode(...params);

export type SelectionFactory = (
  ...params: ConstructorParameters<typeof UserSelectionFacade>
) => UserSelection;

const DefaultSelectionFactory: SelectionFactory = (
  ...params
) => new UserSelectionFacade(...params);

export type FilterFactory = (
  ...params: ConstructorParameters<typeof UserFilter>
) => IUserFilter;

const DefaultFilterFactory: FilterFactory = (...params) => new UserFilter(...params);
