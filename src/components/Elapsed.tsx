import { useEffect, useState } from "react"
import { format_elapsed_ms } from "../utils/time"

interface ElapsedProps {
    date: Date
}

const Elapsed = ({ date }: ElapsedProps) => {
    const [,setBump] = useState(false)
    const elapsed = Date.now() - date.getTime()
    const ms_left = elapsed % 1000
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setBump(bump => !bump)
        }, ms_left)
        return () => {
            clearTimeout(timer)
        }
    })

    return <>{format_elapsed_ms(date)}</>
}

export default Elapsed