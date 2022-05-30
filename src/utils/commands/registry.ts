import HelpCommand from "./list/help"

export interface ICommand {
    name: string
}

export interface IExecutor {
    commands: Map<string, ICommand>

    run(data: string): Promise<string>
    registerCommand(command: ICommand): void
}

class GlobalExecutor implements IExecutor {
    commands: Map<string, ICommand> = new Map()

    async run(data: string): Promise<string> {
        if (!data) {
            return ""
        }

        throw "Method not implemented"
    }

    registerCommand(command: ICommand): void {
        this.commands.set(command.name, command)
    }
}

export const global_executor: IExecutor = new GlobalExecutor()

global_executor.registerCommand(new HelpCommand(global_executor))