import { ICodeBuilder } from '@/application/Context/State/Code/Generation/ICodeBuilder';

export class CodeBuilderStub implements ICodeBuilder {
    public currentLine = 0;
    private text = '';
    public reset() {
        this.text = '';
        this.currentLine = 0;
    }
    public appendLine(code?: string): ICodeBuilder {
        const lines = code?.split(/\r\n|\r|\n/) || [ undefined /* add single line */ ];
        for (const line of lines) {
            this.text += `{{CodeBuilderStub}}: ${line || '{{empty line}}'}`;
            this.text += `\n`;
            this.currentLine++;
        }
        return this;
    }
    public appendTrailingHyphensCommentLine(totalRepeatHyphens: number): ICodeBuilder {
        return this.appendLine(`{{trailing hyphens (total: ${totalRepeatHyphens})}}`);
    }
    public appendCommentLine(commentLine?: string): ICodeBuilder {
        return this.appendLine(`{{comment}} | ${commentLine}`);
    }
    public appendCommentLineWithHyphensAround(sectionName: string, totalRepeatHyphens: number): ICodeBuilder {
        return this.appendLine(`{{hyphens around (total: ${totalRepeatHyphens})}} | {{section name: }} ${sectionName} | {{hyphens around (total: ${totalRepeatHyphens})}}`);
    }
    public appendFunction(name: string, code: string): ICodeBuilder {
        return this
            .appendLine(`{{function}} name: ${name}`)
            .appendLine(`{{function}} code: ${code}`);
    }
    public toString(): string {
        return this.text;
    }
}
