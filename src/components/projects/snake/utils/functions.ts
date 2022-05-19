import { MAP } from "./consts";
import { SetIndices, SnakeTail } from "./types";

export const randomize_cherry_position = (tail: SnakeTail): SetIndices => {
    const empty_indices: SetIndices[] = []

    MAP.forEach((row, y) => {
        row.forEach((v, x) => {
            if (v === 0 && !tail.find(t => t.x === x && t.y === y)) {
                empty_indices.push({ x, y })
            }
        })
    })

    return empty_indices[Math.round(Math.random() * empty_indices.length)]
}