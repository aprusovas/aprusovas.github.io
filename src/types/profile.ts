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
     * About
     */
    about: string
    /**
     * Full name
     */
    full_name: string
    /**
     * Date of experiance started
     */
    experience_started: Date
    /**
     * Profile longer description
     */
    description_longer: string
    /**
     * Profile picture path
     */
    picture: string
    /**
     * Profile picture path for background
     */
    picture_bg: string
    /**
     * Favourite emoji
     */
    favourite_emoji: string
    /**
     * Skills to show in the end of description
     */
    skills: string[]
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