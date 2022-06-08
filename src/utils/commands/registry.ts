import { profile } from "../profile"
import ClearCommand from "./list/clear"
import CVCommand from "./list/cv"
import HelpCommand from "./list/help"

const minimist = require('minimist')

export interface ICommand<T = { [key: string]: any }> {
    name: string
    description: string
    run(args: T): Promise<string>
}

export interface IExecutor {
    commands: Map<string, ICommand>
    on_clear_listeners: (() => void)[]

    run(data: string): Promise<string>

    registerCommand(command: ICommand): void
    registerOnClearListener(listener: () => void): void
    unregisterOnClearListener(listener: () => void): void
}

class GlobalExecutor implements IExecutor {
    commands: Map<string, ICommand> = new Map()
    on_clear_listeners: (() => void)[] = []

    async run(data: string): Promise<string> {
        if (!data) {
            return ""
        }
        try {
            const args = minimist(data.split(' '))
            if (args._.length > 0) {
                const command = this.commands.get(args._[0])
                if (!command) {
                    return `Command not found: ${args._[0]}. Run 'help' to check all command`
                }
                return await command.run(args)
            }
        } catch (err) {
            console.log(err)
        }
        return `Unknown error`
    }

    registerCommand(command: ICommand): void {
        this.commands.set(command.name, command)
    }

    registerOnClearListener(listener: () => void): void {
        this.on_clear_listeners.push(listener)
    }

    unregisterOnClearListener(listener: () => void): void {
        this.on_clear_listeners = this.on_clear_listeners.filter(f => f !== listener)
    }
}

export const global_executor: IExecutor = new GlobalExecutor()

global_executor.registerCommand(new HelpCommand(global_executor))
global_executor.registerCommand(new ClearCommand(global_executor))
global_executor.registerCommand(new CVCommand(global_executor, profile))