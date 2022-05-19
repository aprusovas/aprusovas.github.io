import { MutableRefObject, useCallback, useState } from "react"
import Button from "./Button"

export enum Screen {
    NONE,
    START,
    GAME_OVER
}

interface ScreensProps {
    onStart: () => void
    onRestart: () => void
    onSetScreen: MutableRefObject<((screen: Screen) => void) | undefined>
}

const Screens = ({ onStart, onRestart, onSetScreen }: ScreensProps) => {
    const [screen, setScreen] = useState<Screen>(Screen.START)

    onSetScreen.current = useCallback((screen: Screen) => {
        setScreen(screen)
    }, [])

    return (
        <>
        {
            screen !== Screen.NONE && (
                <div className="bg-slate-200/50 absolute inset-0 flex items-center justify-center m-auto">
                    {
                        screen === Screen.START && (
                            <>
                                <Button name={"PLAY"} onClick={onStart}/>
                            </>
                        )
                    }
                    {
                        screen === Screen.GAME_OVER && (
                            <>
                                <Button name={"RESTART"} onClick={onRestart}/>
                            </>
                        )
                    }
                </div>
            )
        }
        </>
    )
}

export default Screens