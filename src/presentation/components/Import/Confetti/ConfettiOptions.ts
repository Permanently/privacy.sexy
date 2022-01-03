export interface IConfettiOptions {
    readonly totalParticles: number;    // Specifies amount of confetti particles for single explosion
    readonly initSpeed: number;         // Specifies how powerful the explosion will be.
    readonly gravity: number;           // Specifies the speed particles go down after blast-off.
    readonly size: IRandomizableSize;   // Specifies boundaries for randomizing particle size.
    readonly drag: number;              // Specifies how wide is explosion.
    readonly terminalVelocity: number;  // Specifies the speed particles are falling.
    readonly flipSpeed: number;         // Specifies the speed particles are rotating around themselves.
}

export const DefaultConfettiOptions: IConfettiOptions = {
    totalParticles: 70,
    initSpeed: 25,
    gravity: 0.65,
    drag: 0.08,
    terminalVelocity: 6,
    flipSpeed: 0.017,
    size: {
        x: {
            min: 5,
            max: 20,
        },
        y:  {
            min: 10,
            max: 18,
        },
    },
};

export interface IRandomSizeBoundaries {
    readonly min: number;
    readonly max: number;
}

export interface IRandomizableSize {
    readonly x: IRandomSizeBoundaries;
    readonly y: IRandomSizeBoundaries;
}
