import { ICommand, IExecutor } from "../registry";

class ClearCommand implements ICommand<void> {
    name: string = 'clear'
    description: string = 'Clear screen'
    constructor(private readonly executor: IExecutor) {}

    async run(): Promise<string> {
        this.executor.on_clear_listeners.forEach(listener => listener())
        return ""
    }
}

export default ClearCommand