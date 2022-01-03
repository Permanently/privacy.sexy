import { OperatingSystem } from '@/domain/OperatingSystem';
import { IPartialSerializer } from './IPartialSerializer';

export class PlatformSerializer implements IPartialSerializer<OperatingSystem> {
    public stringify(data: OperatingSystem): string {
        return convertToString(data);
    }
    public parse(data: string/*, version: Version*/): OperatingSystem {
        return convertFromString(data);
    }

}

const OsesByNames = new Map<OperatingSystem, string>(
    [
        [OperatingSystem.macOS, 'mac'],
        [OperatingSystem.Windows, 'win'],
    ],
);
const NamesByOses = reverseMap(OsesByNames);
function convertFromString(platform: string): OperatingSystem {
    if (!NamesByOses.has(platform)) {
        throw new Error(`unknown platform: "${platform}"`);
    }
    return NamesByOses.get(platform);
}
function convertToString(os: OperatingSystem): string {
    if (!OsesByNames.has(os)) {
        throw new Error(`unknown operating system: "${OperatingSystem[os]}"`);
    }
    return OsesByNames.get(os);
}
function reverseMap<TKey, TValue>(map: Map<TKey, TValue>): Map<TValue, TKey> {
    const inverse: Map<TValue, TKey> = new Map();
    map.forEach((value, key) => inverse.set(value, key));
    return inverse;
}
