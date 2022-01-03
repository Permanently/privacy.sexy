export function getRandomConfettiParticleColor(): IConfettiParticleColor {
    return getRandomItem(ConfettiParticleColorPalette);
}

export interface IConfettiParticleColor {
    readonly front: string;
    readonly back: string;
}

function getRandomItem<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];

}

const Colors = {
    teal: '#008A8A',
    sherpaBlue: '#005353',
    eastBay: '#394F78',
    cloudBurst: '#222F48',
    butterflyBush: '#664E8B',
    martinique: '#3D2F53',
    hibiscus: '#CD3168',
    claret: '#7B1D3E',
    cinnabar: '#E23D34',
    oldBrick: '#88251F',
    roseOfSharon: '#B96300',
    nutmegWoodFinish: '#6F3B00',
    greenLeaf: '#3B870A',
    sanFelix: '#235106',
};

const ConfettiParticleColorPalette: IConfettiParticleColor[] = [
    { front : Colors.greenLeaf,     back: Colors.sanFelix },
    { front : Colors.roseOfSharon,  back: Colors.nutmegWoodFinish },
    { front : Colors.cinnabar,      back: Colors.oldBrick },
    { front : Colors.hibiscus,      back: Colors.claret },
    { front : Colors.butterflyBush, back: Colors.martinique },
    { front : Colors.eastBay,       back: Colors.cloudBurst },
    { front : Colors.teal,          back: Colors.sherpaBlue },
];
