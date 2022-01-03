import { SelectedScript } from '@/application/Context/State/Selection/SelectedScript';
import { IUserScriptGenerator } from './IUserScriptGenerator';
import { ICodePosition } from '@/application/Context/State/Code/Position/ICodePosition';
import { CodePosition } from '../Position/CodePosition';
import { IUserScript } from './IUserScript';
import { ICodeBuilder } from './ICodeBuilder';
import { ICodeBuilderFactory } from './ICodeBuilderFactory';
import { CodeBuilderFactory } from './CodeBuilderFactory';
import { SelectionImportExport } from '@/application/Context/ImportExport/ContextImportExport';
import { IContextExporter } from '@/application/Context/ImportExport/IContextImportExport';
import { IReadOnlyApplicationContext } from '@/application/Context/IApplicationContext';

export class UserScriptGenerator implements IUserScriptGenerator {
    constructor(
        private readonly codeBuilderFactory: ICodeBuilderFactory = new CodeBuilderFactory(),
        private readonly exporter: IContextExporter = new SelectionImportExport(),
        ) {

    }
    public buildCode(context: IReadOnlyApplicationContext): IUserScript {
        if (!context) { throw new Error('undefined context'); }
        let scriptPositions = new Map<SelectedScript, ICodePosition>();
        const selectedScripts = context.state.selection.selectedScripts;
        if (!selectedScripts.length) {
            return { code: '', scriptPositions };
        }
        const scriptingDefinition = getScriptingDefinition(context);
        const builder = this.codeBuilderFactory.create(scriptingDefinition.language);
        const appender = createAppender(builder);
        appender.initializeCode(scriptingDefinition.startCode);
        for (const script of selectedScripts) {
            scriptPositions = appender.appendSelection(script, scriptPositions);
        }
        appender.finalizeCode(scriptingDefinition.endCode);
        appender.addExportData(this.exporter, context);
        return {
            code: builder.toString(),
            scriptPositions,
        };
    }
}

function createAppender(builder: ICodeBuilder) {
    return {
        initializeCode: (startCode: string): void => {
            if (!startCode) {
                return;
            }
            builder
                .appendLine(startCode)
                .appendLine();
        },
        finalizeCode: (endCode: string): void => {
            if (!endCode) {
                return;
            }
            builder
                .appendLine()
                .appendLine(endCode);
        },
        appendSelection: (
            selection: SelectedScript,
            scriptPositions: Map<SelectedScript, ICodePosition>): Map<SelectedScript, ICodePosition> => {
            const startPosition = builder.currentLine + 1; // Because first line will be empty to separate scripts
            builder = appendCode(selection);
            const endPosition = builder.currentLine - 1;
            builder.appendLine();
            const position = new CodePosition(startPosition, endPosition);
            scriptPositions.set(selection, position);
            return scriptPositions;
        },
        // TODO: Unit test this
        addExportData: (exporter: IContextExporter, context: IReadOnlyApplicationContext) => {
            const exportData = exporter.export(context);
            builder
                .appendCommentLine('Line below makes your script importable if needed (e.g. later re-runs or bug reports)')
                .appendCommentLine(exportData);
        },
    };
    function appendCode(selection: SelectedScript): ICodeBuilder {
        const name = selection.revert ? `${selection.script.name} (revert)` : selection.script.name;
        const scriptCode = selection.revert ? selection.script.code.revert : selection.script.code.execute;
        return builder
            .appendLine()
            .appendFunction(name, scriptCode);
    }
}

// TODO: Unit test this
function getScriptingDefinition(context: IReadOnlyApplicationContext) {
    const collection = context.app.getCollection(context.state.os);
    return collection.scripting;
}
