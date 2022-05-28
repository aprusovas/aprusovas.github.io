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
    date: string
    /**
     * Markdown content
     */
    content: string
    /**
     * Screenshot path
     */
    screenshot?: string
}