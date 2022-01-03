import { Confetti } from './Confetti';

export async function injectConfettiExplosion() {
    const element = createCanvas();
    document.body.appendChild(element);
    element.width = document.documentElement.clientWidth;
    element.height = document.documentElement.clientHeight;
    const manager = new Confetti(element);
    global.addEventListener('resize', manager.resize, false);
    try {
        await manager.renderConfetti();
    } finally {
        global.removeEventListener('resize', manager.resize);
        document.body.removeChild(element);
    }
}

function createCanvas(): HTMLCanvasElement {
    const confetti = document.createElement('canvas');
    confetti.style.position = 'fixed';
    confetti.style.top = '0px';
    confetti.style.left = '0px';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1000';
    return confetti;
}
