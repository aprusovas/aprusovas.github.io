
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import useStickyState from "../../../hooks/useStickyState"
import { global_executor, IExecutor } from "../../../utils/commands/registry"

const MAX_HISTORY = 100

interface TerminalProps {
    title?: string
    onClose?: () => void
    autoFocus?: boolean
    executor: IExecutor
}

const Terminal = ({ title, onClose, autoFocus, executor }: TerminalProps) => {
    const [history, setHistory] = useStickyState<(string | { value: string })[]>([], 'terminal-history')
    const [text, setText] = useState("")

    const ref = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLDivElement>(null)

    const hostname = window.location.hostname

    const onBodyClick = useCallback(() => {
        ref.current?.focus()
    }, [])

    const onKeyDown = useCallback((event: KeyboardEvent) => {
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
    }, [executor, setHistory])

    const onTextChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }, [])

    const onClear = useCallback(() => {
        setHistory([])
    }, [setHistory])

    useEffect(() => {
        bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight)
    }, [text, history])

    useEffect(() => {
        global_executor.registerOnClearListener(onClear)
        return () => {
            global_executor.unregisterOnClearListener(onClear)
        }
    }, [onClear])

    return (
        <div className="bg-gray-800 w-full shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased rounded-lg leading-normal overflow-hidden">
            <div className="relative bg-gray-300 text-gray-900 px-4 py-3 flex items-center pointer-events-none">
                <div className="flex">
                    {
                        onClose ?
                            <div className="h-3 w-3 bg-red-500 rounded-full cursor-pointer group pointer-events-auto" onClick={onClose}>
                                <RiCloseFill className="text-gray-800 text-xs invisible group-hover:visible"/>
                            </div> :
                            <div className="h-3 w-3 bg-gray-400 rounded-full"></div>
                    }
                    <div className="ml-2 h-3 w-3 bg-gray-400 rounded-full"></div>
                    <div className="ml-2 h-3 w-3 bg-gray-400 rounded-full"></div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 lowercase">{title}</div>
            </div>
            <div ref={bodyRef} onClick={onBodyClick} className="px-4 py-3 text-xs cursor-text min-h-[250px] max-h-[300px] overflow-y-scroll w-full">
                {
                    history.map((t, index) => {
                        return (
                            typeof t === 'string' ?
                                <div key={index} className="flex">
                                    <span className="text-green-400 pr-1">{hostname}:~$</span>
                                    <div className="pre-break-all">{t}</div>
                                </div> :
                                <div key={index} className="pre-break-all">{t.value}</div>
                        )
                    })
                }
                <div className="flex">
                    <span className="text-green-400 pr-1">{hostname}:~$</span>
                    <div className="flex-1 typing items-center">
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
                            autoFocus={autoFocus}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Terminal