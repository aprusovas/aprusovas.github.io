/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react"
import Screens, { Screen } from "./Screens"
import { ASSETS_INDICES, CHERRY_REPOSITION_AFTER, FRAME_MIN_TIME, GRID_SIZE, INITIAL_TAIL, MAP } from "./utils/consts"
import { draw_grid, draw_set, draw_snake } from "./utils/draw"
import { SetIndices, SnakeDirection, SnakeTail } from "./utils/types"
import * as _ from "lodash"
import { randomize_cherry_position } from "./utils/functions"

type State = 'running' | 'paused'

interface SnakeData {
    speed: number
    time: number
    tick: number
    direction: SnakeDirection
    next_direction: SnakeDirection
    tail: SnakeTail
    onUp: () => void
    onDown: () => void
    onLeft: () => void
    onRight: () => void
}

const Snake = () => {
    let score = 0
    let level = 1
    let state: State = 'paused'
    let cherry_position: SetIndices | undefined = undefined
    let reposition_cherry = CHERRY_REPOSITION_AFTER

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const levelRef = useRef<HTMLSpanElement>(null)
    const scoreRef = useRef<HTMLSpanElement>(null)
    const setScreenRef = useRef<((screen: Screen) => void) | undefined>()

    const setLevel = (lvl: number) => {
        level = lvl
        if (!levelRef.current) {
            return
        }
        levelRef.current.innerText = ("00" + level).slice(-3)
    }

    const setScore = (scr: number) => {
        score = scr
        if (!scoreRef.current) {
            return
        }
        scoreRef.current.innerText = ("0000" + score).slice(-5)
    }

    const setGameOver = () => {
        if (setScreenRef.current) {
            setScreenRef.current(Screen.GAME_OVER)
        }
        state = 'paused'
    }

    const onStart = () => {
        if (setScreenRef.current) {
            setScreenRef.current(Screen.NONE)
        }
        cherry_position = randomize_cherry_position(snake.tail)
        state = 'running'
    }

    const onRestart = () => {
        snake.speed = 1
        snake.time = 0
        snake.tick = 500
        snake.direction = 'up'
        snake.next_direction = 'up'
        snake.tail = INITIAL_TAIL
        reposition_cherry = CHERRY_REPOSITION_AFTER

        setLevel(1)
        setScore(0)
        onStart()
    }
    
    const snake: SnakeData = {
        speed: 1,
        time: 0,
        tick: 500,
        direction: 'up',
        next_direction: 'up',
        tail: _.cloneDeep(INITIAL_TAIL),
        onUp: function () {
            if (this.direction !== 'down') {
                this.next_direction = 'up'
            }
        },
        onDown: function () {
            if (this.direction !== 'up') {
                this.next_direction = 'down'
            }
        },
        onLeft: function () {
            if (this.direction !== 'right') {
                this.next_direction = 'left'
            }
        },
        onRight: function () {
            if (this.direction !== 'left') {
                this.next_direction = 'right'
            }
        }
    }

    const move_snake = (delta_time: number) => {
        snake.time += delta_time * (snake.speed + level * 0.1)

        if (snake.time < snake.tick) {
            return
        }

        let prev = { x: 0, y: 0 }
        let pick_cherry = false

        const new_tail = _.cloneDeep(snake.tail).map((p, index) => {
            if (index === 0) {
                prev = { x: p.x, y: p.y }
                switch (snake.next_direction) {
                    case 'up': p.y -= 1; break
                    case 'down': p.y += 1; break
                    case 'left': p.x -= 1; break
                    case 'right': p.x += 1; break
                }
                if (p.x < 0 || p.y < 0 || p.x >= MAP[0].length || p.y >= MAP.length) {
                    setGameOver()
                } else if (MAP[p.y][p.x] === 1) {
                    setGameOver()
                } else {
                    for (let i = index + 1; i < snake.tail.length - 1; ++i) {
                        if (p.x === snake.tail[i].x && p.y === snake.tail[i].y) {
                            setGameOver()
                            break
                        }
                    }
                }

                if (cherry_position && p.x === cherry_position.x && p.y === cherry_position.y) {
                    pick_cherry = true
                }
            } else {
                let next_prev = { x: p.x, y: p.y }
                p.x = prev.x
                p.y = prev.y
                prev = next_prev
            }
            return p
        })

        if (state !== 'running') {
            return
        }

        if (pick_cherry) {
            cherry_position = randomize_cherry_position(snake.tail)
            reposition_cherry = CHERRY_REPOSITION_AFTER

            new_tail.push(snake.tail[snake.tail.length - 1])
            
            setScore(score + 100)

            if (score % 300 === 0) {
                setLevel(level + 1)
            }
        }
        
        snake.direction = snake.next_direction
        snake.time = 0
        snake.tail = new_tail
    }

    const onKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowLeft': snake.onLeft(); break
            case 'ArrowRight': snake.onRight(); break
            case 'ArrowUp': snake.onUp(); break
            case 'ArrowDown': snake.onDown(); break
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) {
            return
        }

        const context = canvas.getContext('2d')
        if (!context) {
            return
        }

        let animationFrameId = 0
        let lastFrameTime = 0
        
        const render = (time: DOMHighResTimeStamp) => {
            if (time - lastFrameTime < FRAME_MIN_TIME) {
                animationFrameId = requestAnimationFrame(render)
                return
            }

            context.clearRect(0, 0, canvas.width, canvas.height)
            
            if (state === 'running') {
                const delta_time = time - lastFrameTime

                move_snake(delta_time)

                reposition_cherry -= delta_time

                if (reposition_cherry < 0) {
                    reposition_cherry = CHERRY_REPOSITION_AFTER
                    cherry_position = randomize_cherry_position(snake.tail)
                }
            }
            
            draw_grid(context)
            draw_snake(context, snake.tail, snake.direction)

            if (cherry_position) {
                draw_set(context, ASSETS_INDICES.CHERRY, cherry_position.x * GRID_SIZE, cherry_position.y * GRID_SIZE)
            }

            lastFrameTime = time
            animationFrameId = requestAnimationFrame(render)
        }

        animationFrameId = window.requestAnimationFrame(render)

        document.addEventListener("keydown", onKeyDown)

        return () => {
            window.cancelAnimationFrame(animationFrameId)
            document.removeEventListener("keydown", onKeyDown)
        }
    }, [])

    return (
        <div>
            <div className="font-mono flex text-xs py-2 px-4 gap-x-4 bg-white justify-end">
                <div className="text-slate-600">
                    SCORE: <span className="font-bold" ref={scoreRef}>{("0000" + score).slice(-5)}</span>
                </div>
                <div className="text-slate-600">
                    LEVEL: <span className="font-bold"ref={levelRef}>{("00" + level).slice(-3)}</span>
                </div>
            </div>
            <div className="relative">
                <canvas ref={canvasRef} className="bg-white border border-slate-200 w-full" height={MAP.length * GRID_SIZE}/>
                <Screens onStart={onStart} onRestart={onRestart} onSetScreen={setScreenRef}/>
            </div>
        </div>
    )
}

export default Snake