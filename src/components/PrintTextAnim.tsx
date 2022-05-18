import { useEffect, useState } from "react"

interface PrintTextAnimProps {
    text: string
    initial_delay?: number
}

export const PrintTextAnimDefaultDelay = 25

const PrintTextAnim = ({ text, initial_delay }: PrintTextAnimProps) => {
    const delay = PrintTextAnimDefaultDelay
    const [visibleText, setVisibleText] = useState('')

    useEffect(() => {
        if (text.length === visibleText.length) {
            return
        }

        const timer = setTimeout(() => {
            setVisibleText(prev => {
                return text.slice(0, prev.length + 1)
            })
        }, visibleText.length === 0 ? (initial_delay ?? delay) : delay)

        return () => {
            clearTimeout(timer)
        }
    }, [text, visibleText, delay, initial_delay])

    return (
        <div className="relative">
            <div className="invisible">{text}</div>
            <div className="absolute inset-0">{visibleText}</div>
        </div>
    )
}

export default PrintTextAnim