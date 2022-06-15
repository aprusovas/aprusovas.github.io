import { ICommand, IExecutor } from "../registry";

interface SetTitleCommandArgs {
    set?: string
}

class SetTitleCommand implements ICommand<SetTitleCommandArgs> {
    name: string = 'title'
    description: string = 'Sets terminal title --set "New title name"'
    
    title: string = 'home'
    setTitle: (title: string) => void = () => {}

    constructor(private readonly executor: IExecutor) {}

    async run(args: SetTitleCommandArgs): Promise<string> {
        if (args.set) {
            if (typeof args.set !== 'string') {
                return 'Wrong argument. Usage: --set "New title name"'
            }
            this.title = args.set
            this.setTitle(this.title)
        }
        return this.title
    }
}

export default SetTitleCommand