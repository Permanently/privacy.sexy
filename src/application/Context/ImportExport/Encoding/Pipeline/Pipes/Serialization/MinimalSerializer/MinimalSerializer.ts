import { ITextGrouper } from './ITextGrouper';
import { EscapedJoiner } from './EscapedJoiner';
import { IPersistableScript, IPersistableState } from '@/application/Context/ImportExport/IPersistableState';
import { IPartialSerializer } from './Parts/IPartialSerializer';
import { ExportVersion } from '../../../Context/ExportVersion';
import { ScriptSerializer } from './Parts/ScriptSerializer';
import { OperatingSystem } from '@/domain/OperatingSystem';
import { PlatformSerializer } from './Parts/PlatformSerializer';
import { IModelSerializer } from '../IModelSerializer';

/*
    - Provides minimal serialization with goal of having no character than necessary.
    - Outputs around half the size of the JSON implementation.
    - Serializes persistance model to a string and deserializes a string back to the
      model. Creates a result consisting of grouped parts where
        1. First part is the application version
        2. Second part is the selected platform
        3. Rest are the selected scripts
*/
export class MinimalSerializer implements IModelSerializer {
    constructor(
        private readonly grouper: ITextGrouper = new EscapedJoiner(),
        private readonly scriptSerializer: IPartialSerializer<IPersistableScript> = new ScriptSerializer(),
        private readonly platformSerializer: IPartialSerializer<OperatingSystem> = new PlatformSerializer(),
        ) {

    }
    public stringify(data: IPersistableState): string {
        return this.grouper.join(
            /* 1. appVersion */ data.appVersion,
            /* 2. platform */   this.platformSerializer.stringify(data.platform),
            /* 3. scripts */    ...data.scripts.map((script) => this.scriptSerializer.stringify(script)),
        );
    }
    public parse(serialized: string, version: ExportVersion): IPersistableState {
        const parts = this.grouper.split(serialized, version);
        const [
            /* 1. appVersion */ appVersion,
            /* 2. platform */   platform,
            /* 3. scripts */    ...scripts] = parts;
        return {
            platform: this.platformSerializer.parse(platform, version),
            scripts: scripts.map((scriptData) => this.scriptSerializer.parse(scriptData, version)),
            appVersion,
        };
    }
}
