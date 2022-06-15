import { ICommand, IExecutor } from "../registry";

class HelpCommand implements ICommand<void> {
    name: string = 'help'
    description: string = 'Show All Commands'
    constructor(private readonly executor: IExecutor) {}

    async run(): Promise<string> {
        const lines: string[] = []
        const commands: ICommand[] = Array.from(this.executor.commands.values()).sort((a, b) => {
            return a.name.localeCompare(b.name)
        })
        const max_name_length = Math.max(...commands.map(cmd => cmd.name.length))
        commands.forEach((cmd) => {
            lines.push(`${(" ".repeat(max_name_length) + cmd.name).slice(-max_name_length )}: ${cmd.description}`)
        })
        return lines.join('\n')
    }
}

export default HelpCommand