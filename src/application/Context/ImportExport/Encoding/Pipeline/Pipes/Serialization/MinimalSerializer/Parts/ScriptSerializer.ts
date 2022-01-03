import { IPersistableScript } from '@/application/Context/ImportExport/IPersistableState';
import { ExportVersion } from '../../../../Context/ExportVersion';
import { IPartialSerializer } from './IPartialSerializer';

export class ScriptSerializer implements IPartialSerializer<IPersistableScript> {
    public stringify(script: IPersistableScript): string {
        return stringifyScript(script);
    }
    public parse(serializedScript: string, version: ExportVersion): IPersistableScript {
        return parseScript(serializedScript);
    }
}

const revertIndicator = '↩';
function stringifyScript(script: IPersistableScript): string {
    return (script.revert ? revertIndicator : '') + script.id;
}
function parseScript(script: string): IPersistableScript {
    const isReverted = script[0] === revertIndicator;
    return {
        id: isReverted ? script.substring(1) : script,
        revert: isReverted,
    };
}
