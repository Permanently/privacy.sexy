const currentExportDataVersion = '0.0';

export class ExportVersion {
    public static fromSerializedString(serialized: string): Version {
        return new Version(serialized);
    }
    public static getCurrentVersion(): Version {
        return new Version(currentExportDataVersion);
    }
    public major: number;
    public minor: number;
    private constructor(serializedVersion: string) {
        if (!serializedVersion) {
            throw new Error('empty version');
        }
        if (!serializedVersion.match(/^\d+\.\d+$/g)) {
            throw new Error(`invalid version: ${serializedVersion}`);
        }
        const [major, minor] = serializedVersion.split('.');
        this.major = parseInt(major, 10);
        this.minor = parseInt(minor, 10);
    }
    public serialize(): string {
        return `${this.major}.${this.minor}`;
    }
}
