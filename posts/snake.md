---
id: "snake"
title: "Classic Snake game"
description: "It's time for Snake time! This time I made a classic Snake game using HTML5 canvas.."
screenshot: "snake.png"
screenshot_height: "230px"
date: "2022-05-26"
tags:
  - "game"
  - "snake"
  - "html5"
---

## Classic Snake game

It's time for Snake time! This time I made a classic Snake game using `HTML5` canvas, `TypeScript`, some `JavaScript` and `React`.

Just to have a little bit of fun.

As in every game, everything starts from main loop, this is what I did.

### Main loop

I create two constants to make it easy to change frames per second (a.k.a `FPS`) in any time.

`FRAME_MIN_TIME` will be used to check how many milliseconds one frame should consume to achieve desired `FPS` count.

```javascript
export const FRAMES_PER_SECOND = 10
export const FRAME_MIN_TIME = (1_000 / 60) * (60 / FRAMES_PER_SECOND) - (1_000 / 60) * 0.5
```

Main loop will call `update` and `draw` methods at desired frames per second.

```javascript
const render = (time: DOMHighResTimeStamp) => {
    /* Render method will be called as many times as possible */ 
    if (time - lastFrameTime < FRAME_MIN_TIME) {
        /* Skip updating and rerendering screen if not enought milliseconds elapsed after previous frame */
        animationFrameId = requestAnimationFrame(render)
        return
    }

    /* Clear screen */
    context.clearRect(0, 0, canvas.width, canvas.height)
    
    /* Update only is game state is `running` */
    if (state === 'running') {
        /* How many milliseconds elapsed between previous frame */
        const delta_time = time - lastFrameTime

        /* Update logics */
        update(delta_time)
    }
    
    /* Draw everything */
    draw(context)

    /* Save some variables */
    lastFrameTime = time
    animationFrameId = requestAnimationFrame(render)
}
```

### Map

Map is simple 2 dimentions map of integers which identifies what kind of block should be places and where.

- `0`: Will identify empty space where snake can go.
- `1`: Will be wall and snake should not be able to go there.

```javascript
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
```

### Snake

Snake will hold each tail position in array.

I created initial tail array. This will be starting point when game begins.

```javascript
export const INITIAL_TAIL: SnakeTail = [
    { x: 10, y: 9 },
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
    { x: 10, y: 13 }
]
```

Each update snake will be moving to some direction, so additional information like `direction` should be saved to.

Snake movement is simple.

- Move first snake element (a.k.a `head`) towards set `direction`.
- Check if `head` does not collide with `wall` (Otherwise it is game over)
- Check if `head` reaches `cherry` (Fruit which increases snake tail)
- Move all other tail elements to next element place (index -> index + 1)

### Final result

After some constant tweaks, here is final result. You can check it out, press `Play` (Use arrows to change snake direction):

```component-snake
```

### Thank you 🙏