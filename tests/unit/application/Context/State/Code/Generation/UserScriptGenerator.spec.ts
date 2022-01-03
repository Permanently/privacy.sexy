import 'mocha';
import { expect } from 'chai';
import { UserScriptGenerator } from '@/application/Context/State/Code/Generation/UserScriptGenerator';
import { SelectedScript } from '@/application/Context/State/Selection/SelectedScript';
import { ICodeBuilderFactory } from '@/application/Context/State/Code/Generation/ICodeBuilderFactory';
import { ICodeBuilder } from '@/application/Context/State/Code/Generation/ICodeBuilder';
import { ScriptStub } from '@tests/unit/stubs/ScriptStub';
import { ScriptingDefinitionStub } from '@tests/unit/stubs/ScriptingDefinitionStub';
import { UserSelectionStub } from '@tests/unit/stubs/UserSelectionStub';
import { IScriptingDefinition } from '@/domain/IScriptingDefinition';
import { IUserScript } from '@/application/Context/State/Code/Generation/IUserScript';
import { CodeBuilderStub } from '@tests/unit/stubs/CodeBuilderStub';
import { ApplicationContextStub } from '@tests/unit/stubs/ApplicationContextStub';
import { ApplicationStub } from '@tests/unit/stubs/ApplicationStub';
import { CategoryCollectionStub } from '@tests/unit/stubs/CategoryCollectionStub';
import { OperatingSystem } from '@/domain/OperatingSystem';
import { IApplicationContext } from '@/application/Context/IApplicationContext';
import { CategoryCollectionStateStub } from '@tests/unit/stubs/CategoryCollectionStateStub';

describe('UserScriptGenerator', () => {
    describe('appends end/start from scriptingDefinition', () => {
        describe('startCode', () => {
            it('is prepended if not empty', () => {
                // arrange
                const startCode = 'Start\nCode';
                const script = new ScriptStub('id')
                    .withCode('code\nmulti-lined')
                    .toSelectedScript();
                const definition = new ScriptingDefinitionStub()
                    .withStartCode(startCode)
                    .withEndCode(undefined);
                const expectedStart = `${startCode}\n`;
                // act
                const code = new UserScriptGeneratorTestRunner()
                    .withDefinition(definition)
                    .withSelectedScripts(script)
                    .buildCode();
                // assert
                const actual = code.code;
                expect(actual.startsWith(expectedStart));
            });
            it('is not prepended if empty', () => {
                // arrange
                const codeBuilderStub = new CodeBuilderStub();
                const script = new ScriptStub('id')
                    .withCode('code\nmulti-lined')
                    .toSelectedScript();
                const definition = new ScriptingDefinitionStub()
                    .withStartCode(undefined)
                    .withEndCode(undefined);
                const expectedStart = codeBuilderStub
                    .appendFunction(script.script.name, script.script.code.execute)
                    .toString();
                // act
                const code = new UserScriptGeneratorTestRunner()
                    .withCodeBuilder(codeBuilderStub)
                    .withDefinition(definition)
                    .withSelectedScripts(script)
                    .buildCode();
                // assert
                const actual = code.code;
                expect(actual.startsWith(expectedStart));
            });
        });
        describe('endCode', () => {
            it('is appended if not empty', () => {
                // arrange
                const endCode = 'End\nCode';
                const script = new ScriptStub('id')
                    .withCode('code\nmulti-lined')
                    .toSelectedScript();
                const definition = new ScriptingDefinitionStub()
                    .withEndCode(endCode);
                const expectedEnd = `${endCode}\n`;
                // act
                const code = new UserScriptGeneratorTestRunner()
                    .withDefinition(definition)
                    .withSelectedScripts(script)
                    .buildCode();
                // assert
                const actual = code.code;
                expect(actual.endsWith(expectedEnd));
            });
            it('is not appended if empty', () => {
                // arrange
                const codeBuilderStub = new CodeBuilderStub();
                const script = new ScriptStub('id')
                    .withCode('code\nmulti-lined')
                    .toSelectedScript();
                const expectedEnd = codeBuilderStub
                    .appendFunction(script.script.name, script.script.code.execute)
                    .toString();
                const definition = new ScriptingDefinitionStub()
                    .withEndCode(undefined);
                // act
                const code = new UserScriptGeneratorTestRunner()
                    .withCodeBuilder(codeBuilderStub)
                    .withDefinition(definition)
                    .withSelectedScripts(script)
                    .buildCode();
                // assert
                const actual = code.code;
                expect(actual.endsWith(expectedEnd));
            });
        });
    });
    describe('appends scripts', () => {
        it('appends revert script', () => {
            // arrange
            const scriptName = 'test non-revert script';
            const scriptCode = 'REM nop';
            const script = new ScriptStub('id')
                .withName(scriptName)
                .withRevertCode(scriptCode)
                .toSelectedScript(true);
            // act
            const actual = new UserScriptGeneratorTestRunner()
                .withSelectedScripts(script)
                .buildCode();
            // assert
            expect(actual.code).to.include(`${scriptName} (revert)`);
            expect(actual.code).to.include(scriptCode);
        });
        it('appends non-revert script', () => {
            // arrange
            const scriptName = 'test non-revert script';
            const scriptCode = 'REM nop';
            const script = new ScriptStub('id').withName(scriptName).withCode(scriptCode);
            const selectedScripts = [ new SelectedScript(script, false)];
            // act
            const actual = new UserScriptGeneratorTestRunner()
                .withSelectedScripts(...selectedScripts)
                .buildCode();
            // assert
            expect(actual.code).to.include(scriptName);
            expect(actual.code).to.not.include(`${scriptName} (revert)`);
            expect(actual.code).to.include(scriptCode);
        });
    });
    describe('appends export data', () => {
        // TODO: Test this
    });
    describe('scriptPositions', () => {
        it('without script; returns empty', () => {
            // arrange
            const selectedScripts = [ ];
            // act
            const actual = new UserScriptGeneratorTestRunner()
                .withSelectedScripts(...selectedScripts)
                .buildCode();
            // assert
            expect(actual.scriptPositions.size).to.equal(0);
        });
        describe('with scripts', () => {
            // arrange
            const definition = new ScriptingDefinitionStub()
                .withStartCode('startCode: First line\nstartCode: Second line');
            describe('single script', () => {
                const testCases = [
                    {
                        testName: 'single-lined',
                        scriptCode: 'only line',
                    },
                    {
                        testName: 'multi-lined',
                        scriptCode: 'first line\nsecond line',
                    },
                ];
                for (const testCase of testCases) {
                    it(testCase.testName, () => {
                        const builder = new CodeBuilderStub();
                        const expectedLines = {
                            start: builder
                                .appendLine(definition.startCode)
                                .appendLine() // empty line after start code
                                .currentLine + 1 // add one additional line to ignore next empty line
                            ,
                            end: builder
                                .appendLine()
                                .appendFunction('testScript', testCase.scriptCode)
                                .currentLine - 1 /* remove one to ignore last line from appendFunction */
                            ,
                        };
                        const selectedScript = new ScriptStub(`script-id`)
                                .withName(`script`)
                                .withCode(testCase.scriptCode)
                                .toSelectedScript(false);
                        builder.reset();
                        // act
                        const actual = new UserScriptGeneratorTestRunner()
                            .withDefinition(definition)
                            .withSelectedScripts(selectedScript)
                            .withCodeBuilder(builder)
                            .buildCode();
                        // assert
                        expect(1).to.equal(actual.scriptPositions.size);
                        const position = actual.scriptPositions.get(selectedScript);
                        expect(expectedLines.start).to.equal(position.startLine,
                            `Unexpected start line position. Expected ${expectedLines.start}, got ${position.startLine}.\n${showLineNumbers(actual.code)}\n`);
                        expect(expectedLines.end).to.equal(position.endLine,
                            `Unexpected end line position. Expected ${expectedLines.end}, got ${position.endLine}.\n${showLineNumbers(actual.code)}\n`);
                    });
                }
            });
            it('multiple scripts', () => {
                const selectedScripts = [
                    new ScriptStub('firstScript').withCode('only line'),
                    new ScriptStub('secondScript').withCode('first line\nsecond line'),
                ].map((s) => s.toSelectedScript());
                const builder = new CodeBuilderStub();
                const expectedLines = {
                    first: {
                        start: builder
                            .appendLine(definition.startCode)
                            .appendLine() // empty line after start code
                            .currentLine + 1 // add one additional line to ignore ignore next empty line
                        ,
                        end: builder
                            .appendLine()
                            .appendFunction(selectedScripts[0].script.name, selectedScripts[0].script.code.execute)
                            .currentLine - 1 /* remove one to ignore last line from appendFunction */
                        ,
                    },
                    second: {
                        start: builder
                            .appendLine()
                            .currentLine + 1 // add one additional line to ignore next empty line
                        ,
                        end: builder
                            .appendLine()
                            .appendFunction(selectedScripts[1].script.name, selectedScripts[1].script.code.execute)
                            .currentLine - 1 /* remove one to ignore last line from appendFunction */
                        ,
                    },
                };
                builder.reset();
                // act
                const actual = new UserScriptGeneratorTestRunner()
                    .withDefinition(definition)
                    .withSelectedScripts(...selectedScripts)
                    .withCodeBuilder(builder)
                    .buildCode();
                // assert
                const firstPosition = actual.scriptPositions.get(selectedScripts[0]);
                const secondPosition = actual.scriptPositions.get(selectedScripts[1]);
                expect(actual.scriptPositions.size).to.equal(2);
                expect(expectedLines.first.start).to.equal(firstPosition.startLine,
                    `Unexpected start line position (first script). Expected ${expectedLines.first.start}, got ${firstPosition.startLine}.\n${showLineNumbers(actual.code)}\n`);
                expect(expectedLines.first.end).to.equal(firstPosition.endLine,
                    `Unexpected end line position (first script). Expected ${expectedLines.first.end}, got ${firstPosition.endLine}.\n${showLineNumbers(actual.code)}\n`);
                expect(expectedLines.second.start).to.equal(secondPosition.startLine,
                    `Unexpected start line position (second script). Expected ${expectedLines.second.start}, got ${secondPosition.startLine}.\n${showLineNumbers(actual.code)}\n`);
                expect(expectedLines.second.end).to.equal(secondPosition.endLine,
                    `Unexpected end line position (second script). Expected ${expectedLines.second.end}, got ${secondPosition.endLine}.\n${showLineNumbers(actual.code)}\n`);
            });
        });
    });
});

function showLineNumbers(text: string): string {
    return text
        .split(/\r\n|\r|\n/)
        .map((line, index) => `(${index}): ${line}`)
        .join('\n');
}

class UserScriptGeneratorTestRunner {
    private definition: IScriptingDefinition = new ScriptingDefinitionStub();
    private selectedScripts: readonly SelectedScript[];
    private codeBuilderFactory: ICodeBuilderFactory = mockCodeBuilderFactory(new CodeBuilderStub());

    public withDefinition(definition: IScriptingDefinition): UserScriptGeneratorTestRunner {
        this.definition = definition;
        return this;
    }
    public withCodeBuilder(codeBuilder: ICodeBuilder): UserScriptGeneratorTestRunner {
        this.codeBuilderFactory = mockCodeBuilderFactory(codeBuilder);
        return this;
    }
    public withSelectedScripts(...scripts: readonly SelectedScript[]): UserScriptGeneratorTestRunner {
        this.selectedScripts = scripts;
        return this;
    }

    public buildCode(): IUserScript {
        const context = createContext(this.definition, this.selectedScripts);
        const sut = new UserScriptGenerator(this.codeBuilderFactory);
        return sut.buildCode(context);
    }
}

function mockCodeBuilderFactory(mock: ICodeBuilder): ICodeBuilderFactory {
    return {
        create: () => mock,
    };
}

function createContext(
    scripting: IScriptingDefinition,
    selectedScripts: readonly SelectedScript[]): IApplicationContext {
    const os = OperatingSystem.Windows;
    const collection = new CategoryCollectionStub().withScripting(scripting).withOs(os);
    const app = new ApplicationStub().withCollection(collection);
    const selection = new UserSelectionStub().withSelectedScripts(selectedScripts);
    const state = new CategoryCollectionStateStub()
        .withCollection(collection)
        .withSelection(selection);
    const context = new ApplicationContextStub()
        .withApplication(app)
        .withState(state);
    return context;
}
