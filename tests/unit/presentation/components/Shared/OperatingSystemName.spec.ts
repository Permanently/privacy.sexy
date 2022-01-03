import 'mocha';
import { expect } from 'chai';
import { OperatingSystem } from '@/domain/OperatingSystem';
import { getOperatingSystemName } from '@/presentation/components/Shared/OperatingSystemName.vue';

// TODO: Create a component test instead, https://vuejs.org/v2/cookbook/unit-testing-vue-components.html

describe('OsNamePrinter', () => {
    describe('getOperatingSystemName', () => {
        describe('prints names of supported systems', () => {
            // arrange
            const supportedOses = getSupportedDesktopPlatforms();
            for (const os of supportedOses) {
                it(OperatingSystem[os], () => {
                    // act
                    const name = getOperatingSystemName(os);
                    // assert
                    expect(name).to.have.lengthOf.above(0);
                });
            }
        });
        it('returns different names for supported systems', () => {
            // arrange
            const supportedOses = getSupportedDesktopPlatforms();
            // act
            const names = supportedOses.map((os) => getOperatingSystemName(os));
            // assert
            const duplicates = getDuplicates(names);
            expect(duplicates).to.have.lengthOf(0);
        });
    });
});

function getSupportedDesktopPlatforms() {
    return [
        OperatingSystem.macOS,
        OperatingSystem.Windows,
        OperatingSystem.Linux,
    ];
}

function getDuplicates(texts: readonly string[]): string[] {
    return texts.filter((item, index) => texts.indexOf(item) !== index);
}
