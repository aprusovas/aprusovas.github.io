import { ReactNode } from "react"

interface PostProps {
    children: ReactNode
}

const Post = ({ children }: PostProps) => {
    return <div className="bg-slate-200/50 w-full rounded-lg overflow-hidden">{children}</div>
}

export default Post