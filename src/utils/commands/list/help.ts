import { ICommand, IExecutor } from "../registry";

class HelpCommand implements ICommand {
    name: string = 'help'
    constructor(private readonly executor: IExecutor) {}

    async run(...args: any[]): Promise<string> {
        let lines = ''
        this.executor.commands.forEach((cmd) => {
            lines += `${cmd}\n`
        })
        return lines
    }
}

export default HelpCommand