import { ProfileInfo } from "../../../types/profile";
import { since } from "../../time";
import { ICommand, IExecutor } from "../registry";

interface CVCommandArgs {
    about?: boolean
}

class CVCommand implements ICommand<CVCommandArgs> {
    name: string = 'cv'
    description: string = 'Show Curriculum Vitae (CV) --about'
    constructor(private readonly executor: IExecutor, private readonly profile: ProfileInfo) {}

    async run(args: CVCommandArgs): Promise<string> {
        const lines: string[] = []
        const width = 60
        const title_width = 10
        const add_line = (value: string, key?: string) => {
            let line = 1
            do {
                let parsed_symbols = width
                let max_width = width - (key ? (title_width + 5) : 4)
                let current_line = value.slice(0, max_width)

                let latest_space = current_line.lastIndexOf(' ')
                if (latest_space > 0 && current_line.length === max_width) {
                    current_line = value.slice(0, latest_space + 1)
                    parsed_symbols = latest_space + 1
                }

                let fill_symbols = max_width - current_line.length
                if (fill_symbols > 0) {
                    current_line += ' '.repeat(fill_symbols)
                }
                
                if (key) {
                    if (line > 1) {
                        lines.push(`| ${" ".repeat(title_width)} ${current_line} |`)
                    } else {
                        lines.push(`| ${(" ".repeat(title_width) + key).slice(-title_width)} ${current_line} |`)
                    }
                } else {
                    lines.push(`| ${current_line} |`)
                }

                value = value.slice(parsed_symbols)
                line++
            } while (value.length > 0)
        }

        lines.push(`┌${'-'.repeat(width - 2)}┐`)
        lines.push(`|${' '.repeat(width - 2)}|`)

            add_line(this.profile.full_name, "Name")
            add_line(`${since(this.profile.experience_started)}+`, "Experience")

            if (this.profile.urls.linkedin) {
                add_line(`${this.profile.urls.linkedin}`, "LinkedIn")
            }

            if (this.profile.urls.github) {
                add_line(`${this.profile.urls.github}`, "GitHub")
            }

            if (this.profile.urls.facebook) {
                add_line(`${this.profile.urls.facebook}`, "Facebook")
            }

            add_line(`${this.profile.skills.join(', ')}`, "Skills")
    
        if (args.about) {
            lines.push(`|${' '.repeat(width - 2)}|`)
            lines.push(`├${'-'.repeat(width - 2)}┤`)
            lines.push(`|${' '.repeat(width - 2)}|`)

            this.profile.about.split('\n').forEach((v) => {
                add_line(v)
            })
        }
        
        lines.push(`|${' '.repeat(width - 2)}|`)
        lines.push(`└${'-'.repeat(width - 2)}┘`)

        return lines.join('\n')
    }
}

export default CVCommand