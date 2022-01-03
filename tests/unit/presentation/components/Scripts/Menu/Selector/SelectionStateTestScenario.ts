import { SelectedScript } from '@/application/Context/State/Selection/SelectedScript';
import { RecommendationLevel } from '@/domain/RecommendationLevel';
import { CategoryCollectionStateStub } from '@tests/unit/stubs/CategoryCollectionStateStub';
import { ScriptStub } from '@tests/unit/stubs/ScriptStub';
import { OperatingSystem } from '@/domain/OperatingSystem';
import { UserSelectionStub } from '@tests/unit/stubs/UserSelectionStub';
import { CategoryCollectionStub } from '@tests/unit/stubs/CategoryCollectionStub';
import { CategoryStub } from '@tests/unit/stubs/CategoryStub';
import { ICategoryCollectionState } from '@/application/Context/State/ICategoryCollectionState';

export class SelectionStateTestScenario {
    public readonly data: SelectionStateTestData;
    public generateState(selectedScripts: readonly SelectedScript[]): ICategoryCollectionState {
        const os = OperatingSystem.Linux;
        const allScripts = this.data.all.map((s) => s.script);
        return new CategoryCollectionStateStub()
            .withOs(os)
            .withSelection(
                new UserSelectionStub()
                    .withAllSelectableScripts(allScripts)
                    .withSelectedScripts(selectedScripts),
            )
            .withCollection(
                new CategoryCollectionStub()
                    .withOs(os)
                    .withTotalScripts(allScripts.length)
                    .withAction(new CategoryStub(0).withScripts(...allScripts)),
            );
    }
}

export class SelectionStateTestData {
    public readonly all: readonly SelectedScript[];
    public readonly allStandard: readonly SelectedScript[];
    public readonly someStandard: readonly SelectedScript[];
    public readonly someStrict: readonly SelectedScript[];
    public readonly allStrict: readonly SelectedScript[];
    public readonly someUnrecommended: readonly SelectedScript[];
    public readonly allUnrecommended: readonly SelectedScript[];
    constructor() {
        this.someStandard = createSelectedScripts(RecommendationLevel.Standard, 'standard-some-1', 'standard-some-2');
        this.allStandard = [...this.someStandard, ...createSelectedScripts(RecommendationLevel.Standard, 'standard-all-1', 'standard-all-2')];
        this.someStrict = createSelectedScripts(RecommendationLevel.Strict, 'strict-some-1', 'strict-some-2');
        this.allStrict = [...this.someStrict, ...createSelectedScripts(RecommendationLevel.Strict, 'strict-all-1', 'strict-all-2')];
        this.someUnrecommended = createSelectedScripts(undefined, 'unrecommended-some-1', 'unrecommended-some-2');
        this.allUnrecommended = [...this.someUnrecommended, ...createSelectedScripts(undefined, 'unrecommended-all-1', 'unrecommended-all-2')];
        this.all = [...this.allStandard, ...this.allStrict, ...this.allUnrecommended];
    }
}

function createSelectedScripts(level?: RecommendationLevel, ...ids: string[]) {
    return ids.map((id) => new SelectedScript(new ScriptStub(id).withLevel(level), false));
}
