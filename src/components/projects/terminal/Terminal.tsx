
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import useStickyState from "../../../hooks/useStickyState"
import { IExecutor } from "../../../utils/commands/registry"

const MAX_HISTORY = 100

interface TerminalProps {
    onClose?: () => void
    executor: IExecutor
}

const Terminal = ({ onClose, executor }: TerminalProps) => {
    const [history, setHistory] = useStickyState<(string | { value: string })[]>([], 'terminal-history')
    const [text, setText] = useState("")

    const ref = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLDivElement>(null)

    const hostname = window.location.hostname
    const location = 'Home'

    const onBodyClick = () => {
        ref.current?.focus()
    }
    const onKeyDown = (event: KeyboardEvent) => {
        const value = ref.current?.value
        if (event.key === 'Enter' && value != null) {
            setHistory(prev => {
                return [...prev, value].slice(-MAX_HISTORY)
            })

            setText("")

            executor.run(value).then((data) => {
                if (data) {
                    setHistory(prev => {
                        return [...prev, { value: data }].slice(-MAX_HISTORY)
                    })
                }
            }).catch((err) => {
                if (err) {
                    setHistory(prev => {
                        return [...prev, { value: err }].slice(-MAX_HISTORY)
                    })
                }
            })
        }
    }
    const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    useEffect(() => {
        bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight)
    }, [text, history])

    return (
        <div className="bg-gray-800 w-full shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased rounded-lg leading-normal overflow-hidden">
            <div className="bg-gray-300 text-gray-900 px-4 py-3 flex items-center pointer-events-none">
                <div className="flex">
                    <div className="h-3 w-3 bg-red-500 rounded-full cursor-pointer group pointer-events-auto" onClick={onClose}>
                        <RiCloseFill className="text-gray-800 text-xs invisible group-hover:visible"/>
                    </div>
                    <div className="ml-2 h-3 w-3 bg-gray-400 rounded-full"></div>
                    <div className="ml-2 h-3 w-3 bg-gray-400 rounded-full"></div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 lowercase">{location}</div>
            </div>
            <div ref={bodyRef} onClick={onBodyClick} className="px-4 py-3 text-xs aspect-video cursor-text max-h-[300px] overflow-y-scroll">
                {
                    history.map((t, index) => {
                        return (
                            typeof t === 'string' ?
                                <div key={index} className="flex">
                                    <span className="text-green-400 pr-1">{hostname}:~$</span>
                                    <p>{t}</p>
                                </div> :
                                <div key={index}>{t.value}</div>
                        )
                    })
                }
                <div className="flex">
                    <span className="text-green-400 pr-1">{hostname}:~$</span>
                    <p className="flex-1 typing items-center">
                        <input
                            ref={ref}
                            onKeyDown={onKeyDown}
                            onChange={onTextChange}
                            value={text}
                            type="text"
                            className="bg-transparent outline-none w-full"
                            autoComplete="false"
                            autoCorrect="false"
                            autoCapitalize="none"
                            autoFocus
                        />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Terminal