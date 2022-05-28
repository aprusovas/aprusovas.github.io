import { ReactNode } from "react";

export interface ContentInfo {
    /**
     * Custom content which can be embed to markdown
     */
    [key: string]: ReactNode
}