import { ICommand, IExecutor } from "../registry";

class HistoryCommand implements ICommand<void> {
    name: string = 'history'
    description: string = 'Show History'
    constructor(private readonly executor: IExecutor) {}

    async run(): Promise<string> {
        const lines: string[] = []
        const history = JSON.parse(localStorage.getItem('terminal-history') ?? '[]')
        if (Array.isArray(history)) {
            let index = 1
            for (const value of history) {
                if (typeof value === 'string') {
                    lines.push(`${(" ".repeat(2) + index).slice(-2)}: ${value}`)
                    index++
                }
            }
        }
        return lines.join('\n')
    }
}

export default HistoryCommand