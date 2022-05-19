import { SnakeTail } from "./types"

interface Assets {
    set: HTMLImageElement,
    grid_width: number,
    grid_height: number
}

export const FRAMES_PER_SECOND = 10
export const FRAME_MIN_TIME = (1_000 / 60) * (60 / FRAMES_PER_SECOND) - (1_000 / 60) * 0.5
export const GRID_SIZE = 15
export const CHERRY_REPOSITION_AFTER = 10_000

export const ASSETS: Assets = {
    set: new Image(),
    grid_height: 3,
    grid_width: 4
}

export const ASSETS_INDICES = {
    TREE: { x: 0, y: 0 },
    GRASS: { x: 0, y: 1 },
    TAIL_START: { x: 1, y: 2 },
    TAIL_MIDDLE: { x: 1, y: 1 },
    TAIL_END: { x: 0, y: 2 },
    TAIL_CORNER: { x: 1, y: 0 },
    CHERRY: { x: 3, y: 2 }
}

export const MAP = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]

export const INITIAL_TAIL: SnakeTail = [
    { x: 10, y: 9 },
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
    { x: 10, y: 13 }
]

ASSETS.set.src = './img/snakeset.png'