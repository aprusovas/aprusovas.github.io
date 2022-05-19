import { ASSETS, GRID_SIZE, MAP, ASSETS_INDICES } from "./consts"
import { SetIndices, SnakeTail, SnakeDirection } from "./types"

export const draw_set = (ctx: CanvasRenderingContext2D, indices: SetIndices, x: number, y: number) => {
    const width = ASSETS.set.width / ASSETS.grid_width
    const height = ASSETS.set.height / ASSETS.grid_height

    ctx.drawImage(ASSETS.set, width * indices.x, height * indices.y, width, height, x, y, GRID_SIZE, GRID_SIZE)
}

export const draw_set_rotated = (ctx: CanvasRenderingContext2D, indices: SetIndices, x: number, y: number, degrees: number = 0) => {
    const width = ASSETS.set.width / ASSETS.grid_width
    const height = ASSETS.set.height / ASSETS.grid_height
    const x_offset = width * indices.x
    const y_offset = height * indices.y
    const half_size = GRID_SIZE / 2

    ctx.save()
    ctx.translate(x + half_size, y + half_size)
    ctx.rotate(degrees * Math.PI / 180.0)
    ctx.translate(-x - half_size, -y - half_size)
    ctx.drawImage(ASSETS.set, x_offset, y_offset, width, height, x, y, GRID_SIZE, GRID_SIZE)
    ctx.restore()
}

export const draw_grid = (ctx: CanvasRenderingContext2D) => {
    const width = ctx.canvas.width
    const height = ctx.canvas.height

    let s = GRID_SIZE
    let nX = Math.round(width / s)
    let nY = Math.floor(height / s)
    let pR = width - nX * s
    let pB = height - nY * s
        
    ctx.strokeStyle = 'lightgrey'
    ctx.beginPath()

    for (var x = 0, x_grid = 0; x < width - pR; x += s, x_grid++) {
        for (var y = 0, y_grid = 0; y < height - pB; y += s, y_grid++) {
            switch (MAP[y_grid][x_grid]) {
                case 0: draw_set(ctx, ASSETS_INDICES.GRASS, x, y); break
                case 1: draw_set(ctx, ASSETS_INDICES.TREE, x, y); break
            }
        }
    }
    
    ctx.stroke()
}

export const draw_snake = (ctx: CanvasRenderingContext2D, snake_tail: SnakeTail, direction: SnakeDirection) => {
    let s = GRID_SIZE

    snake_tail.forEach((tail, index) => {
        if (index === 0) {
            let rotation = 0
            switch (direction) {
                case 'up': rotation = 180; break
                case 'left': rotation = 90; break
                case 'right': rotation = 270; break
            }
            if (rotation === 0) {
                draw_set(ctx, ASSETS_INDICES.TAIL_START, tail.x * s, tail.y * s)
            } else {
                draw_set_rotated(ctx, ASSETS_INDICES.TAIL_START, tail.x * s, tail.y * s, rotation)
            }
        } else if (index === snake_tail.length - 1) {
            const prev = snake_tail[index - 1]
            if (prev.x === tail.x) {
                if (prev.y > tail.y) {
                    draw_set_rotated(ctx, ASSETS_INDICES.TAIL_END, tail.x * s, tail.y * s, 270)
                } else {
                    draw_set_rotated(ctx, ASSETS_INDICES.TAIL_END, tail.x * s, tail.y * s, 90)
                }
            } else if (prev.x > tail.x) {
                draw_set_rotated(ctx, ASSETS_INDICES.TAIL_END, tail.x * s, tail.y * s, 180)
            } else {
                draw_set(ctx, ASSETS_INDICES.TAIL_END, tail.x * s, tail.y * s)
            }
        } else {
            const prev = snake_tail[index - 1]
            const next = snake_tail[index + 1]
            const x_diff = prev.x - next.x
            const y_diff = prev.y - next.y

            if (x_diff === 0 || y_diff === 0) {
                if (prev.x === tail.x) {
                    draw_set(ctx, ASSETS_INDICES.TAIL_MIDDLE, tail.x * s, tail.y * s)
                } else if (prev.y === tail.y) {
                    draw_set_rotated(ctx, ASSETS_INDICES.TAIL_MIDDLE, tail.x * s, tail.y * s, 90)
                }
            } else {
                if (x_diff === -1 && y_diff === -1) {
                    draw_set_rotated(ctx, ASSETS_INDICES.TAIL_CORNER, tail.x * s, tail.y * s,
                        tail.x === next.x && tail.y === prev.y ? 90 : 270)
                } else if (x_diff === -1 && y_diff === 1) {
                    draw_set_rotated(ctx, ASSETS_INDICES.TAIL_CORNER, tail.x * s, tail.y * s,
                        tail.x === next.x && tail.y === prev.y ? 180 : 0)
                } else if (x_diff === 1 && y_diff === 1) {
                    draw_set_rotated(ctx, ASSETS_INDICES.TAIL_CORNER, tail.x * s, tail.y * s, 
                        tail.x === next.x && tail.y === prev.y ? 270 : 90)
                } else if (x_diff === 1 && y_diff === -1) {
                    draw_set_rotated(ctx, ASSETS_INDICES.TAIL_CORNER, tail.x * s, tail.y * s, 
                        tail.x === next.x && tail.y === prev.y ? 0 : 180)
                }
            }
        }
    })
}