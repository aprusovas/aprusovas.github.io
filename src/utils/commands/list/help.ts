import { ICommand, IExecutor } from "../registry";

class HelpCommand implements ICommand<void> {
    name: string = 'help'
    description: string = 'Show commands'
    constructor(private readonly executor: IExecutor) {}

    async run(): Promise<string> {
        const lines: string[] = []
        this.executor.commands.forEach((cmd) => {
            lines.push(`${(" ".repeat(10) + cmd.name).slice(-10 )}: ${cmd.description}`)
        })
        return lines.join('\n')
    }
}

export default HelpCommand