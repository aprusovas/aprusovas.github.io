export interface PostInfo {
    /**
     * Unique post identifier
     */
    id: string
    /**
     * Post type
     */
    title: string
    /**
     * Post description
     */
    description: string
    /**
     * Tags
     */
    tags: string[]
    /**
     * Date
     */
    date: string | "upcoming"
    /**
     * Markdown content
     */
    content: string
    /**
     * Screenshot path
     */
    screenshot?: string
    /**
     * Screenshot height
     */
    screenshot_height?: string
}