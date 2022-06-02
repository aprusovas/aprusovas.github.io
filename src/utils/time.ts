export const since = (date: Date): string => {
    let seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    let interval = seconds / 31536000

    if (interval > 1) {
        const result = Math.floor(interval)
        return result + " year" + (result !== 1 ? 's' : '')
    }
    
    interval = seconds / 2592000
    if (interval > 1) {
        const result = Math.floor(interval)
        return result + " month" + (result !== 1 ? 's' : '')
    }
    
    interval = seconds / 86400
    if (interval > 1) {
        const result = Math.floor(interval)
        return result + " day" + (result !== 1 ? 's' : '')
    }
    
    interval = seconds / 3600
    if (interval > 1) {
        const result = Math.floor(interval)
        return result + " hour" + (result !== 1 ? 's' : '')
    }
    
    interval = seconds / 60
    if (interval > 1) {
        const result = Math.floor(interval)
        return result + " minute" + (result !== 1 ? 's' : '')
    }
    
    const result = Math.floor(seconds)
    return result + " second" + (result !== 1 ? 's' : '')
}