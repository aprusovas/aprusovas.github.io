import { useEffect, useRef } from "react"

const FRAMES_PER_SECOND = 5
const FRAME_MIN_TIME = (1000/60) * (60 / FRAMES_PER_SECOND) - (1000/60) * 0.5
const GRID_SIZE = 15
const ASSETS: {
    set: HTMLImageElement,
    grid_width: number,
    grid_height: number
} = {
    set: new Image(),
    grid_height: 3,
    grid_width: 4
}
const MAP = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]
const SNAKE = {
    speed: 1,
    time: 0,
    tick: 500,
    direction: 'up',
    tail: [
        { x: 10, y: 9 },
        { x: 10, y: 10 },
        { x: 10, y: 11 },
        { x: 10, y: 12 },
        { x: 10, y: 13 }
    ],
    onUp: function () {
        this.direction = 'up'
    },
    onDown: function () {
        this.direction = 'down'
    },
    onLeft: function () {
        this.direction = 'left'
    },
    onRight: function () {
        this.direction = 'right'
    },
    move: function (delta_time: number) {
        this.time += delta_time * this.speed

        if (this.time < this.tick) {
            return
        }

        this.time = 0

        let prev = { x: 0, y: 0 }

        this.tail = this.tail.map((p, index) => {
            if (index === 0) {
                prev = { x: p.x, y: p.y }
                switch (this.direction) {
                    case 'up': p.y -= 1; break
                    case 'down': p.y += 1; break
                    case 'left': p.x -= 1; break
                    case 'right': p.x += 1; break
                }
            } else {
                let next_prev = { x: p.x, y: p.y }
                p.x = prev.x
                p.y = prev.y
                prev = next_prev
            }
            return p
        })

    }
}

const draw_set = (ctx: CanvasRenderingContext2D, grid_x: number, grid_y: number, x: number, y: number, rotate: number = 0) => {
    const width = ASSETS.set.width / ASSETS.grid_width
    const height = ASSETS.set.height / ASSETS.grid_height

    ctx.drawImage(ASSETS.set, width * grid_x, height * grid_y, width, height, x, y, GRID_SIZE, GRID_SIZE)
}

const draw_set_rotated = (ctx: CanvasRenderingContext2D, grid_x: number, grid_y: number, x: number, y: number, degrees: number = 0) => {
    const width = ASSETS.set.width / ASSETS.grid_width
    const height = ASSETS.set.height / ASSETS.grid_height
    const x_offset = width * grid_x
    const y_offset = height * grid_y
    const half_size = GRID_SIZE / 2

    ctx.save()
    ctx.translate(x + half_size, y + half_size)
    ctx.rotate(degrees * Math.PI / 180.0)
    ctx.translate(-x - half_size, -y - half_size)
    ctx.drawImage(ASSETS.set, x_offset, y_offset, width, height, x, y, GRID_SIZE, GRID_SIZE)
    ctx.restore()
}

const draw_grid = (ctx: CanvasRenderingContext2D, delta_time: number) => {
    const width = ctx.canvas.width
    const height = ctx.canvas.height

    let s = GRID_SIZE
    let nX = Math.floor(width / s) - 2
    let nY = Math.floor(height / s) - 1
    let pX = width - nX * s
    let pY = height - nY * s
    let pL = Math.ceil(pX / 2)
    let pT = Math.ceil(pY / 2)
    let pR = width - nX * s - pL
    let pB = height - nY * s - pT
        
    ctx.strokeStyle = 'lightgrey'
    ctx.beginPath()

    for (var x = pL, x_grid = 0; x < width - pR; x += s, x_grid++) {
        for (var y = pT, y_grid = 0; y < height - pB; y += s, y_grid++) {
            switch (MAP[y_grid][x_grid]) {
                case 0: draw_set(ctx, 0, 1, x, y); break
                case 1: draw_set(ctx, 0, 0, x, y); break
            }
        }
    }
    
    ctx.stroke()
}

const draw_snake = (ctx: CanvasRenderingContext2D, delta_time: number) => {
    // let index = 0
    let s = GRID_SIZE

    SNAKE.tail.forEach((tail, index) => {
        if (index === 0) {
            let rotation = 0
            switch (SNAKE.direction) {
                case 'up': rotation = 180; break
                case 'left': rotation = 90; break
                case 'right': rotation = 270; break
            }
            draw_set_rotated(ctx, 1, 2, tail.x * s, tail.y * s, rotation)
        } else if (index === SNAKE.tail.length - 1) {
            draw_set_rotated(ctx, 0, 2, tail.x * s, tail.y * s, 90)
        } else {
            switch (index) {
                case 0: draw_set_rotated(ctx, 1, 2, tail.x * s, tail.y * s, 180); break
                default: draw_set_rotated(ctx, 1, 1, tail.x * s, tail.y * s, 0); break
            }
        }
    })
}

const draw = (ctx: CanvasRenderingContext2D, delta_time: number) => {
    draw_grid(ctx, delta_time)
    draw_snake(ctx, delta_time)
}

const update = (delta_time: number) => {
    SNAKE.move(delta_time)
}

const load = () => {
    ASSETS.set.src = './img/snakeset.png'
}

load()

const Snake = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

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

            const delta_time = time - lastFrameTime

            update(delta_time)
            draw(context, delta_time)

            lastFrameTime = time
            animationFrameId = requestAnimationFrame(render)
        }

        const onKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft': SNAKE.onLeft(); break
                case 'ArrowRight': SNAKE.onRight(); break
                case 'ArrowUp': SNAKE.onUp(); break
                case 'ArrowDown': SNAKE.onDown(); break
            }
        }

        animationFrameId = window.requestAnimationFrame(render)

        document.addEventListener("keydown", onKeyDown)

        return () => {
            window.cancelAnimationFrame(animationFrameId)
            document.removeEventListener("keydown", onKeyDown)
        }
    }, [])

    return (
        <canvas ref={canvasRef} className="bg-white border border-slate-200 w-full" height={250}/>
    )
}

export default Snake