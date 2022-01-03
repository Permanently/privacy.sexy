import { CodeChangedEvent } from './Event/CodeChangedEvent';
import { CodePosition } from './Position/CodePosition';
import { ICodeChangedEvent } from './Event/ICodeChangedEvent';
import { SelectedScript } from '@/application/Context/State/Selection/SelectedScript';
import { UserScriptGenerator } from './Generation/UserScriptGenerator';
import { EventSource } from '@/infrastructure/Events/EventSource';
import { IApplicationCode } from './IApplicationCode';
import { IUserScriptGenerator } from './Generation/IUserScriptGenerator';
import { IUserScript } from './Generation/IUserScript';
import { IReadOnlyApplicationContext } from '@/application/Context/IApplicationContext';

export class ApplicationCode implements IApplicationCode {
    public readonly changed = new EventSource<ICodeChangedEvent>();
    public current: string;

    private scriptPositions = new Map<SelectedScript, CodePosition>();

    constructor(
        private readonly context: IReadOnlyApplicationContext,
        private readonly generator: IUserScriptGenerator = new UserScriptGenerator()) {
        if (!context) { throw new Error('undefined context'); }
        if (!generator) { throw new Error('undefined generator'); }
        context.contextChanged.on(() => this.updateCode());
    }

    private updateCode(): void {
        const oldScripts = Array.from(this.scriptPositions.keys());
        const script = this.generator.buildCode(this.context);
        this.current = script.code;
        this.scriptPositions = script.scriptPositions;
        this.notifyCodeChange(script, oldScripts);
    }

    private notifyCodeChange(newScript: IUserScript, oldScripts: SelectedScript[]) {
        const event = new CodeChangedEvent(newScript.code, oldScripts, newScript.scriptPositions);
        this.changed.notify(event);
    }
}
