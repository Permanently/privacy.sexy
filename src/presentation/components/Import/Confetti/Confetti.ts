import { ConfettiParticle } from './ConfettiParticle';
import { ISize } from './ConfettiSize';
import { IConfettiOptions, DefaultConfettiOptions } from './ConfettiOptions';

export class Confetti {
    private readonly confettiParticles = new Array<ConfettiParticle>();
    private readonly renderContext: CanvasRenderingContext2D;
    private dimensions: ISize;
    private animationFrameId: number | undefined;

    constructor(canvasElement: HTMLCanvasElement,
                private readonly options: IConfettiOptions = DefaultConfettiOptions) {
        this.renderContext = canvasElement.getContext('2d');
        this.dimensions = {
            width: canvasElement.clientWidth,
            height: canvasElement.clientHeight,
        };
        this.addConfettiParticles();
    }
    public renderConfetti(): Promise<void> {
        return new Promise((resolve) => {
            this.renderRecursively(resolve);
        });
    }
    public resize() {
        this.dimensions = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        };
    }
    private addConfettiParticles(): void {
        for (let i = 0; i < this.options.totalParticles; i++) {
            const particle = new ConfettiParticle(this.dimensions, this.options);
            this.confettiParticles.push(particle);
        }
    }
    private renderRecursively(resolve: () => void) {
        this.renderContext.clearRect(0, 0, this.dimensions.width, this.dimensions.height);
        for (const confetti of this.confettiParticles) {
            confetti.update();
            this.renderContext.translate(confetti.position.x, confetti.position.y);
            this.renderContext.rotate(confetti.rotation);
            const width = (confetti.size.x * confetti.scale.x);
            const height = (confetti.size.y * confetti.scale.y);
            this.renderContext.fillStyle = confetti.color;
            this.renderContext.fillRect(-0.5 * width, -0.5 * height, width, height);
            this.renderContext.setTransform(1, 0, 0, 1, 0, 0);
        }
        this.confettiParticles.forEach((c: ConfettiParticle, index) => {
            if (c.position.y > this.dimensions.height ||
                c.position.x < -0.5 * this.dimensions.width ||
                c.position.x > 1.5 * this.dimensions.width) {
                    this.confettiParticles.splice(index, 1);
            }
        });
        if (this.confettiParticles.length > 0) {
            this.animationFrameId = window.requestAnimationFrame(() => this.renderRecursively(resolve));
        } else {
            window.cancelAnimationFrame(this.animationFrameId);
            resolve();
        }
    }
}
