export interface ProfileInfo {
    /**
     * Profile title
     */
    title: string
    /**
     * Profile description
     */
    description: string
    /**
     * Profile picture path
     */
    picture: string
    /**
     * Urls
     */
    urls: {
        /**
         * LinkedIn
         */
        linkedin?: string
        /**
         * Facebook
         */
        facebook?: string
        /**
         * GitHub
         */
        github?: string
    }
    /**
     * Badges
     */
    badges: {
        /**
         * Skills
         */
        skills: string[]
        /**
         * Other badges
         */
        other: string[]
    }
}