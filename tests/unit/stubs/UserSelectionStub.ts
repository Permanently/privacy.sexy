import { IUserSelection } from '@/application/Context/State/Selection/IUserSelection';
import { SelectedScript } from '@/application/Context/State/Selection/SelectedScript';
import { IScript } from '@/domain/IScript';
import { IEventSource } from '@/infrastructure/Events/IEventSource';
import { EventSource } from '@/infrastructure/Events/EventSource';
import { OperatingSystem } from '@/domain/OperatingSystem';
import { ScriptStub } from './ScriptStub';

export class UserSelectionStub implements IUserSelection {
    public selectedOs: OperatingSystem = OperatingSystem.Windows;
    public readonly changed: IEventSource<readonly SelectedScript[]> = new EventSource<readonly SelectedScript[]>();
    public selectedScripts: readonly SelectedScript[] = [];

    private allSelectableScripts: readonly IScript[] = [ new ScriptStub('1') ];
    
    public withSelectedScripts(selectedScripts: readonly SelectedScript[]): UserSelectionStub {
        this.selectedScripts = selectedScripts;
        return this;
    }
    public withAllSelectableScripts(allSelectableScripts: readonly IScript[]) {
        this.allSelectableScripts = allSelectableScripts;
        return this;
    }


    public areAllSelected(): boolean {
        throw new Error('Method not implemented.');
    }
    public isAnySelected(): boolean {
        throw new Error('Method not implemented.');
    }
    public removeAllInCategory(): void {
        throw new Error('Method not implemented.');
    }
    public addOrUpdateAllInCategory(): void {
        throw new Error('Method not implemented.');
    }
    public addSelectedScript(): void {
        throw new Error('Method not implemented.');
    }
    public addOrUpdateSelectedScript(): void {
        throw new Error('Method not implemented.');
    }
    public removeSelectedScript(): void {
        throw new Error('Method not implemented.');
    }
    public selectOnly(scripts: readonly SelectedScript[]): void {
        this.selectedScripts = scripts;
    }
    public isSelected(): boolean {
        throw new Error('Method not implemented.');
    }
    public selectAll(): void {
        this.selectOnly(this.allSelectableScripts.map((s) => new SelectedScript(s, false)));
    }
    public deselectAll(): void {
        this.selectedScripts = [];
    }
}
