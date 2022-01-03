export abstract class PipelineRunner<TPipe> {
    private pipes = new Array<TPipe>();
    public withPipe(pipe: TPipe) {
        if (!pipe) {
            throw new Error('undefined pipe');
        }
        this.pipes.push(pipe);
        return this;
    }
    protected runPipeline(callback: (pipe: TPipe) => void): void {
        for (const pipe of this.pipes) {
            callback(pipe);
        }
    }
}
