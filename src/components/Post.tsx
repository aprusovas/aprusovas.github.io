import { useEffect, useRef, useState } from "react";
import { RiCloseFill } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';
import { CodeProps } from "react-markdown/lib/ast-to-react";
import rehypeRaw from 'rehype-raw';
import { ContentInfo } from "../types/content";
import { PostInfo } from "../types/post";
import { ProfileInfo } from "../types/profile";
import { since } from "../utils/time";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface TagProps {
    /**
     * Tag name
     */
    name: string
    /**
     * Render bigger tag
     */
    big?: boolean
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

const Tag = ({ name, big }: TagProps) => {
    return (
        <div className={`rounded-md text-slate-600 bg-slate-50 uppercase px-2 py-1 ${big ? `text-md` : `text-xs scale-90`}`}>{name}</div>
    )
}

const PostDialog = ({ post, content, profile, onToggleDialog }: PostDialogProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)
    const onCloseDropdown = () => {
        setVisible(false)
    }

    useEffect(() => {
        const body_style = window.document.body.style
        if (ref.current) {
            ref.current.style.height = `${Math.min(1400, ref.current.scrollHeight, window.innerHeight - 12)}px`
        }

        body_style.overflow = 'hidden'

        return () => {
            body_style.overflow = 'auto'
        }
    }, [])

    useEffect(() => {
        setVisible(true)
    }, [])

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined = undefined
        if (!visible) {
            timer = setTimeout(() => {
                onToggleDialog()
            }, 200)
        }

        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [onToggleDialog, visible])

    return (
        <div onClick={e => e.preventDefault()} className={`cursor-default fixed inset-0 p-2 md:p-4 bg-black/10 z-10 transition-opacity ${visible ? `opacity-100` : `opacity-0`}`}>
            <div className="relative max-w-[500px] md:max-w-[700px] h-full m-auto flex items-center">
                <div className={`w-full relative bg-white rounded-xl overflow-hidden z-10 shadow-lg ring-1 ring-slate-200 transition-all ${visible ? `translate-y-0 opacity-100` : `translate-y-4 opacity-0`}`}>
                    <div onClick={onCloseDropdown} className="absolute right-6 top-6 text-2xl bg-slate-50/50 hover:bg-slate-100 rounded-full cursor-pointer p-2 z-10">
                        <RiCloseFill />
                    </div>
                    <div ref={ref} className="p-6 pb-20 overflow-y-scroll">
                        <article className="prose lg:prose-xl">
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    pre: ({ children }: any) => {
                                        return <div>{children}</div>
                                    },
                                    code: ({ className, children, inline, ...props }: CodeProps) => {
                                        if (className && className.startsWith('language-component-')) {
                                            return content[className.slice(19)] as any ?? <div>NOT FOUND</div>
                                        }
                                        const match = /language-(\w+)/.exec(className || '')
                                        return !inline && match ? (
                                          <SyntaxHighlighter
                                            children={String(children).replace(/\n$/, '')}
                                            style={dracula as any}
                                            language={match[1]}
                                            PreTag="div"
                                            showLineNumbers
                                            wrapLines
                                            {...props}
                                          />
                                        ) : (
                                          <code className={className} {...props}>
                                            {children}
                                          </code>
                                        )
                                    }
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </article>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 text-white bg-gradient-to-t from-black/80 to-black/0 px-4 pb-4 pt-5 text-sm flex gap-x-2 items-center">
                        <img src={profile.picture} alt="Profile" className="w-4 h-4 rounded-full ring-1 ring-white"/>
                        <div className="truncate">
                            {post.date === "upcoming" ? `Comming soon` : `${since(new Date(post.date))} ago`}
                        </div>
                        <div className="grow flex flex-row-reverse">{post.tags.sort().reverse().map(t => <Tag key={t} name={t}/>)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const PostLoading = () => {
    return (
        <div className="bg-white text-slate-800 shadow-lg shadow-slate-400/20 w-full rounded-lg overflow-hidden mb-7 mt-1">
            <div className="py-3">
                <div className="font-extrabold text-2xl px-4 py-2">
                    <div className="w-[120px] bg-slate-300 rounded-md h-[20px]"></div>
                </div>
                <div className="px-4 py-2 text-slate-700">
                    <div className="max-w-[400px] bg-slate-200 rounded-md h-[35px]"></div>
                </div>
            </div>
            <div className="relative bg-slate-400 aspect-video"></div>
        </div>
    )
}

const Post = ({ post, content, profile }: PostProps) => {
    const [visible, set_visible] = useState(false)
    const onToggleDialog = () => {
        set_visible(!visible)
    }
    return (
        <div onClick={!visible ? onToggleDialog : undefined} className="bg-white text-slate-800 shadow-lg shadow-slate-400/20 rounded-lg overflow-hidden mb-7 mt-1 transition-all outline outline-offset-0 outline-none hover:outline-4 md:hover:outline-8 hover:outline-slate-600/40 cursor-pointer">
            <div className="py-3">
                <div className="font-extrabold text-2xl px-4 py-1">{post.title}</div>
                <div className="px-4 text-slate-700">{post.description}</div>
            </div>
            <div className="relative bg-slate-400">
                {
                    post.screenshot ?
                        <div className="aspect-video" style={{ backgroundImage: `url('/img/screenshots/${post.screenshot}')`, backgroundSize: 'cover' }}></div> :
                        <div className="my-12"></div>
                }
                <div className={`absolute bottom-0 inset-x-0 text-white bg-gradient-to-t from-black/80 to-black/0 pl-4 pr-2 pb-3 pt-4 text-sm flex gap-x-2 items-center ${post.screenshot ? `pt-8` : `pt-4`}`}>
                    {post.date !== "upcoming" && <img src={profile.picture} alt="Profile" className="w-4 h-4 rounded-full ring-1 ring-white"/>}
                    <div className="truncate">
                        {post.date === "upcoming" ? `Comming soon` : `${since(new Date(post.date))} ago`}
                    </div>
                    <div className="grow flex flex-row-reverse">
                        {post.tags.sort().reverse().map(t => <Tag key={t} name={t}/>)}
                    </div>
                </div>
            </div>
            { visible && <PostDialog post={post} content={content} profile={profile} onToggleDialog={onToggleDialog}/>}
        </div>
    )
}

export default Post