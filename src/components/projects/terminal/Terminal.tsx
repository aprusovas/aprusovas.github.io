
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import { FiMinus } from "react-icons/fi"
import { BsChevronExpand } from "react-icons/bs"
import useStickyState from "../../../hooks/useStickyState"
import { global_executor, IExecutor } from "../../../utils/commands/registry"

const MAX_HISTORY = 100

interface TerminalProps {
    title?: string
    onClose?: () => void
    onResize?: () => void
    onEnlarge?: () => void
    autoFocus?: boolean
    executor: IExecutor
}

const get_history_by_index = (index: number): string => {
    if (index < 0) {
        return ""
    }
    const history = JSON.parse(localStorage.getItem('terminal-history') ?? '[]')
    if (Array.isArray(history)) {
        let curr_index = 0
        for (let i = history.length - 1; i >= 0; --i) {
            const value = history[i]
            if (typeof value === 'string') {
                if (index === curr_index) {
                    return value
                }
                curr_index++
            }
        }
    }
    return ""
}

const Terminal = ({ title, onClose, onResize, onEnlarge, autoFocus, executor }: TerminalProps) => {
    const [history_index, setHistoryIndex] = useState(-1)
    const [history, setHistory] = useStickyState<(string | { value: string })[]>([], 'terminal-history')
    const [large, setLarge] = useState(false)
    const [minimized, setMinimized] = useState(false)
    const [text, setText] = useState("")
    const ref = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLDivElement>(null)
    const hostname = window.location.hostname
    const onBodyClick = useCallback(() => {
        ref.current?.focus()
    }, [])

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        const value = ref.current?.value

        if (event.key === 'ArrowDown') {
            const next_index = Math.max(history_index - 1, -1)
            const next_text = get_history_by_index(next_index)

            setHistoryIndex(next_index)
            setText(next_text)

            event.preventDefault()
            event.stopPropagation()
        }

        if (event.key === 'ArrowUp') {
            const next_index = Math.min(history_index + 1, history.length - 1)
            const next_text = get_history_by_index(next_index)

            setHistoryIndex(next_index)
            setText(next_text)

            event.preventDefault()
            event.stopPropagation()
        }

        if (event.key === 'Enter' && value != null) {
            setHistoryIndex(-1)
            setHistory(prev => { return [...prev, value].slice(-MAX_HISTORY) })
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
    }, [executor, history.length, history_index, setHistory])

    const onTextChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }, [])

    const onClear = useCallback(() => {
        setHistory([])
    }, [setHistory])

    const onEnlargeHandler = useCallback(() => {
        setLarge(!large)
        onEnlarge?.()
    }, [large, onEnlarge])

    const onResizeHandler = useCallback(() => {
        setMinimized(!minimized)
        onResize?.()
    }, [minimized, onResize])

    useEffect(() => {
        bodyRef.current?.scrollTo(0, bodyRef.current.scrollHeight)
        ref.current?.setSelectionRange(text.length, text.length)
    }, [text, history])

    useEffect(() => {
        global_executor.registerOnClearListener(onClear)
        return () => {
            global_executor.unregisterOnClearListener(onClear)
        }
    }, [onClear])

    return (
        <div className={`bg-gray-800 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased rounded-lg leading-normal overflow-hidden transition-all ${large ? `fixed z-50 w-auto ${!minimized ? 'inset-4' : 'inset-x-4 top-4'}` : `w-full`} `}>
            <div className="relative bg-gray-300 text-gray-900 px-4 py-3 flex items-center pointer-events-none group">
                <div className="flex">
                    {
                        onClose ?
                            <div className="h-3 w-3 bg-red-500 rounded-full cursor-pointer pointer-events-auto" onClick={onClose}>
                                <RiCloseFill className="text-gray-800 text-xs invisible group-hover:visible"/>
                            </div> :
                            <div className="h-3 w-3 bg-gray-400 rounded-full"></div>
                    }
                    {
                        onResize ?
                            <div className="ml-2 h-3 w-3 bg-yellow-500 rounded-full cursor-pointer pointer-events-auto" onClick={onResizeHandler}>
                                <FiMinus className="text-gray-800 text-xs invisible group-hover:visible"/>
                            </div> :
                            <div className="ml-2 h-3 w-3 bg-gray-400 rounded-full"></div>
                    }
                    {
                        onEnlarge ?
                            <div className="ml-2 h-3 w-3 bg-green-500 rounded-full cursor-pointer pointer-events-auto" onClick={onEnlargeHandler}>
                                <BsChevronExpand className="text-gray-800 text-xs invisible group-hover:visible -rotate-45"/>
                            </div> :
                            <div className="ml-2 h-3 w-3 bg-gray-400 rounded-full"></div>
                    }
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 lowercase">{title}</div>
            </div>
            {
                !minimized &&
                <div ref={bodyRef} onClick={onBodyClick} className={`px-4 py-3 text-xs cursor-text overflow-y-scroll w-full ${large ? `` : `min-h-[250px] max-h-[300px]`}`} style={{ height: large ? 'calc(100% - 36px)' : '' }}>
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
            }
        </div>
    )
}

export default Terminal