import { IDimensions, ISize } from './ConfettiSize';
import { IConfettiOptions, IRandomizableSize, IRandomSizeBoundaries } from './ConfettiOptions';
import { getRandomConfettiParticleColor, IConfettiParticleColor } from './ConfettiParticleColor';

export class ConfettiParticle {
    public readonly rotation: number = getRandomNumber(0, 2 * Math.PI);
    public color: string;
    public readonly size: IDimensions;
    public readonly position: IDimensions;
    public readonly scale: IDimensions;
    private readonly randomModifier: number = getRandomNumber(-1, 1);
    private readonly colorPair: IConfettiParticleColor = getRandomConfettiParticleColor();
    private readonly flipSpeed: number;
    private readonly terminalVelocity: number;
    private readonly velocity: IDimensions;
    constructor(container: ISize,
                private readonly options: IConfettiOptions) {
        this.size = getRandomSize(options.size);
        this.position = getCenter(container);
        this.scale = { x: 1, y: 1 };
        this.velocity = {
            x: getRandomNumber(-options.initSpeed, options.initSpeed) * 0.4,
            y: getRandomNumber(-options.initSpeed, options.initSpeed),
        };
        this.flipSpeed = getRandomNumber(0.2, 1.5) * options.flipSpeed;
        if (this.position.y <= container.height) {
            this.velocity.y = -Math.abs(this.velocity.y);
        }
        this.terminalVelocity = getRandomNumber(1, 1.5) * options.terminalVelocity;
    }
    public update() {
        this.velocity.x *= 0.98;
        this.position.x += this.velocity.x;
        this.velocity.y += (this.randomModifier * this.options.drag);
        this.velocity.y += this.options.gravity;
        this.velocity.y = Math.min(this.velocity.y, this.terminalVelocity);
        this.position.y += this.velocity.y;
        this.scale.y = Math.cos((this.position.y + this.randomModifier) * this.flipSpeed);
        this.color = this.scale.y > 0 ? this.colorPair.front : this.colorPair.back;
    }
}

function getRandomSize(size: IRandomizableSize): IDimensions {
    return {
        x: getRandomDimension(size.x),
        y: getRandomDimension(size.y),
    };
    function getRandomDimension(boundaries: IRandomSizeBoundaries): number {
        return getRandomNumber(boundaries.min, boundaries.max);
    }
}

function getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}


function getCenter(dimensions: ISize): IDimensions {
    return {
        x: dimensions.width / 2,
        y: dimensions.height / 2,
    };
}
