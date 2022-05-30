---
id: "terminal"
title: "Terminal for custom commands"
description: "I decided to make terminal for my registered custom commands, for example `export cv`, etc.."
screenshot: "terminal.png"
screenshot_height: "120px"
date: "2022-05-30"
tags:
  - "terminal"
---

## Terminal for custom commands

I decided to make terminal with following functionality.

- Register commands
- Pass arguments when executing commands
- Initial commands: `help`, `clear`

More commands will be added in the future.

## Registry

Each command will be registered and should implement `ICommand` interface.

This is example of how `help` command look like.

Command have `name`, `description` and `run` method which will be called on enter press.

```typescript
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
```

After some styling with `tailwindcss`, here is final result:

```component-terminal
```