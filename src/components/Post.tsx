import { useEffect, useRef, useState } from "react";
import { RiCloseFill } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';
import { CodeProps } from "react-markdown/lib/ast-to-react";
import rehypeRaw from 'rehype-raw';
import { ContentInfo } from "../types/content";
import { PostInfo } from "../types/post";
import { ProfileInfo } from "../types/profile";

interface TagProps {
    /**
     * Tag name
     */
    name: string
}

interface PostProps {
    /**
     * Post
     */
    post: PostInfo
    /**
     * Profile
     */
    profile: ProfileInfo
    /**
     * Content
     */
    content: ContentInfo
}

interface PostDialogProps extends PostProps {
    onToggleDialog: () => void
}

const Tag = ({ name }: TagProps) => {
    return (
        <div className="rounded-md text-slate-600 bg-slate-50 text-xs uppercase px-2 py-1 scale-90">{name}</div>
    )
}

const PostDialog = ({ post, content, profile, onToggleDialog }: PostDialogProps) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref.current) {
            ref.current.style.height = `${Math.min(1400, ref.current.scrollHeight, window.innerHeight - 12)}px`
        }
    }, [])

    return (
        <div className="fixed inset-0 p-2 md:p-4 bg-black/10 z-10">
            <div className="relative max-w-[500px] md:max-w-[700px] h-full m-auto flex items-center">
                <div className="relative bg-white rounded-xl overflow-hidden z-10 shadow-lg ring-1 ring-slate-200">
                    <div onClick={onToggleDialog} className="absolute right-6 top-6 text-2xl bg-slate-50/50 hover:bg-slate-100 rounded-full cursor-pointer p-2 z-10">
                        <RiCloseFill />
                    </div>
                    <div ref={ref} className="p-6 pb-20 overflow-y-scroll">
                        <article className="prose lg:prose-xl">
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    pre: ({ children }: any) => {
                                        return <>{children}</>
                                    },
                                    code: ({ className, children, node }: CodeProps) => {
                                        if (className && className.startsWith('language-component-')) {
                                            return content[className.slice(19)] as any ?? <div>NOT FOUND</div>
                                        }
                                        return <code>{children}</code>
                                    }
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </article>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 text-white bg-gradient-to-t from-black/80 to-black/0 px-4 pb-3 pt-8 text-sm flex gap-x-2 items-center">
                        <img src={profile.picture} alt="Profile" className="w-4 h-4 rounded-full ring-1 ring-white"/>
                        <div>{post.date}</div>
                        <div className="grow flex flex-row-reverse">{post.tags.sort().reverse().map(t => <Tag key={t} name={t}/>)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const PostLoading = () => {
    return (
        <div className="bg-white text-slate-800 shadow-lg shadow-slate-400/20 w-full rounded-lg overflow-hidden my-4">
            <div className="py-3">
                <div className="font-extrabold text-2xl px-4 py-1">
                    <div className="w-[200px] bg-slate-300 rounded-md h-[20px]"></div>
                </div>
                <div className="px-4 text-slate-700">
                    <div className="w-[400px] bg-slate-200 rounded-md h-[30px]"></div>
                </div>
            </div>
            <div className="relative bg-slate-400 h-[200px]"></div>
        </div>
    )
}

const Post = ({ post, content, profile }: PostProps) => {
    const [visible, set_visible] = useState(false)
    const onToggleDialog = () => {
        set_visible(!visible)
    }
    return (
        <div onClick={!visible ? onToggleDialog : undefined} className={`bg-white text-slate-800 shadow-lg shadow-slate-400/20 w-full rounded-lg overflow-hidden my-4 ${!visible && `hover:scale-[102%] cursor-pointer transition-transform`}`}>
            <div className="py-3">
                <div className="font-extrabold text-2xl px-4 py-1">{post.title}</div>
                <div className="px-4 text-slate-700">{post.description}</div>
            </div>
            <div className="relative bg-slate-400">
                <div className="h-[200px]" style={{ backgroundImage: `url('/img/screenshots/${post.screenshot}')`, backgroundSize: 'cover' }}></div>
                <div className="absolute bottom-0 inset-x-0 text-white bg-gradient-to-t from-black/80 to-black/0 px-4 pb-3 pt-8 text-sm flex gap-x-2 items-center">
                    <img src={profile.picture} alt="Profile" className="w-4 h-4 rounded-full ring-1 ring-white"/>
                    <div>{post.date}</div>
                    <div className="grow flex flex-row-reverse">{post.tags.sort().reverse().map(t => <Tag key={t} name={t}/>)}</div>
                </div>
            </div>
            { visible && <PostDialog post={post} content={content} profile={profile} onToggleDialog={onToggleDialog}/>}
        </div>
    )
}

export default Post