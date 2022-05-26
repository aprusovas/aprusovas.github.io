import React, { useEffect, useState } from "react";
import { RiCloseFill } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';
import { CodeProps } from "react-markdown/lib/ast-to-react";
import rehypeRaw from 'rehype-raw';
import { ContentInfo } from "../types/content";
import { PostInfo } from "../types/post";
import { ProfileInfo } from "../types/profile";

interface TagProps {
    name: string
}

interface PostProps {
    post: PostInfo
    profile: ProfileInfo
    content: ContentInfo
}

const Tag = ({ name }: TagProps) => {
    return (
        <div className="rounded-md text-slate-600 bg-slate-50 text-xs uppercase px-2 py-1 scale-90">{name}</div>
    )
}

const Post = ({ post, profile, content }: PostProps) => {
    const [markdown, setMarkdown] = useState("")
    const [visible, set_visible] = useState(false)
    const onToggleDialog = () => {
        set_visible(!visible)
    }
    const date = new Date(post.date).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    
    useEffect(() => {
        if (visible) {
            fetch(`/posts/${post.id}.md`).then((response) => {
                return response.text()
            }).then((md) => {
                setMarkdown(md)
            }).catch(console.error)
        }
    }, [content, post.id, visible])
    
    return (
        <div onClick={!visible ? onToggleDialog : undefined} className={`bg-white text-slate-800 shadow-lg shadow-slate-400/20 w-full rounded-lg overflow-hidden my-4 ${!visible && `hover:scale-[102%] cursor-pointer transition-transform`}`}>
            <div className="py-3">
                <div className="font-extrabold text-2xl px-4 py-1">{post.title}</div>
                <div className="px-4 text-slate-700">{post.description}</div>
            </div>
            <div className="relative bg-black/50">
                <div className="h-[200px]" style={{ backgroundImage: `url('/img/screenshots/${post.screenshot}')`, backgroundSize: 'cover' }}></div>
                <div className="absolute bottom-0 inset-x-0 text-white bg-gradient-to-t from-black/80 to-black/0 px-4 pb-3 pt-8 text-sm flex gap-x-2 items-center">
                    <img src={profile.picture} alt="Profile" className="w-4 h-4 rounded-full ring-1 ring-white"/>
                    <div>{date}</div>
                    <div className="grow flex flex-row-reverse">{post.tags.sort().reverse().map(t => <Tag key={t} name={t}/>)}</div>
                </div>
            </div>
            {
                visible &&
                    <div className="fixed inset-0 bg-black/10">
                        <div className="relative max-w-[500px] w-full h-full m-auto">
                            <div className="absolute inset-0 bg-white m-2 md:m-4 rounded-xl z-10 shadow-lg overflow-y-scroll ring-1 ring-slate-200">
                                <div onClick={onToggleDialog} className="absolute right-6 top-6 text-2xl bg-slate-50/50 hover:bg-slate-100 rounded-full cursor-pointer p-2">
                                    <RiCloseFill />
                                </div>
                                <div className="overflow-y-auto h-full p-6 pb-20">
                                    <div className="font-extrabold text-3xl pt-1 pb-2">{post.title}</div>
                                    <div className="text-slate-700">{post.description}</div>
                                    <img className="my-2 rounded-lg overflow-hidden" src={`/img/screenshots/${post.screenshot}`} alt="Post preview"/>
                                    <article className="prose lg:prose-xl">
                                        <ReactMarkdown
                                            rehypePlugins={[rehypeRaw]}
                                            components={{
                                                pre: ({ children }: any) => {
                                                    return <>{children}</>
                                                },
                                                code: ({ className, children, node }: CodeProps) => {
                                                    if (className && className.startsWith('language-component-')) {
                                                        return content[className.slice(19)] ?? <div>NOT FOUND</div>
                                                    }
                                                    return <code>{children}</code>
                                                }
                                            }}
                                        >
                                            {markdown}
                                        </ReactMarkdown>
                                    </article>
                                </div>
                                <div className="absolute bottom-0 inset-x-0 text-white bg-gradient-to-t from-black/80 to-black/0 px-4 pb-3 pt-8 text-sm flex gap-x-2 items-center">
                                    <img src={profile.picture} alt="Profile" className="w-4 h-4 rounded-full ring-1 ring-white"/>
                                    <div>{date}</div>
                                    <div className="grow flex flex-row-reverse">{post.tags.sort().reverse().map(t => <Tag key={t} name={t}/>)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Post