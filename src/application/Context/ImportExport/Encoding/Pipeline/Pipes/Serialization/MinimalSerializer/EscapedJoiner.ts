import { ExportVersion } from '../../../Context/ExportVersion';
import { ITextGrouper } from './ITextGrouper';

export class EscapedJoiner implements ITextGrouper {
    public join(...groups: readonly string[]): string {
        return escapeAndJoin(...groups);
    }
    public split(grouped: string, version: ExportVersion): string[] {
        return splitAndUnescape(grouped, version);
    }
}

const partSeparator = ';';
const escapePrefix = '\\';

function escapeAndJoin(...parts: readonly string[]): string {
    const escaped = parts.map((part) =>
        part.replaceAll(partSeparator, `${escapePrefix}${partSeparator}`));
    return escaped.join(partSeparator);
}

const splitRegex = new RegExp(`(?<!\\${escapePrefix})${partSeparator}`);

function splitAndUnescape(merged: string, version: Version): string[] {
    const parts = merged.split(splitRegex);
    const unescapedParts = parts.map((part) =>
        part.replaceAll(`${escapePrefix}${partSeparator}`, partSeparator));
    return unescapedParts;
}
