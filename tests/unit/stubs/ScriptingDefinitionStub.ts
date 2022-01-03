import { IScriptingDefinition } from '@/domain/IScriptingDefinition';
import { ScriptingLanguage } from '@/domain/ScriptingLanguage';

export class ScriptingDefinitionStub implements IScriptingDefinition {
    public fileExtension: string = '.bat';
    public language = ScriptingLanguage.batchfile;
    public startCode = '[ScriptingDefinitionStub]startCode';
    public endCode = '[ScriptingDefinitionStub]endCode';

    public withStartCode(startCode: string): ScriptingDefinitionStub {
        this.startCode = startCode;
        return this;
    }
    public withEndCode(endCode: string): ScriptingDefinitionStub {
        this.endCode = endCode;
        return this;
    }
    public withLanguage(language: ScriptingLanguage): ScriptingDefinitionStub {
        this.language = language;
        return this;
    }
}
