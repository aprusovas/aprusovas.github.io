import { useEffect, useState } from "react";
import { ProfileInfo } from "../types/profile";
import { ContentInfo } from "../types/content";
import Filters, { FiltersLoading } from "./Filters";
import Footer from "./Footer";
import Post, { PostLoading } from './Post';
import Profile from "./Profile";
import { BsClipboard, BsTerminal, } from 'react-icons/bs';
import { RiCloseFill } from "react-icons/ri"
import { PostInfo } from "../types/post";
import Terminal from "./projects/terminal/Terminal";
import { global_executor } from "../utils/commands/registry";

const fm = require('front-matter')

interface AppProps {
    /**
     * Profile information
     */
    profile: ProfileInfo
    /**
     * Posts paths to load
     */
    posts: string[]
    /**
     * Content
     */
    content: ContentInfo
}

const load_post = async (path: string): Promise<PostInfo> => {
    const response = await fetch(path)
    const content = await response.text()
    const data = fm(content)
    
    if (data.attributes.date && data.attributes.date !== "upcoming") {
        data.attributes.date = new Date(data.attributes.date).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const result = { ...data.attributes, ...{ content: data.body } } as PostInfo
    
    result.id = result.id ?? Math.random().toString()
    result.title = result.title ?? 'Unknown'
    result.description = result.description ?? 'Unknown description'
    result.date = result.date ?? new Date().toString()
    result.tags = result.tags ?? []
    result.content = result.content ?? ''
    
    return result
}

const NoPosts = () => {
    return (
        <div className="text-center text-xl font-semibold text-slate-600 py-16">
            <BsClipboard className="m-auto text-6xl pb-2"/>
            <div>No posts found..</div>
        </div>
    )
}

const OpenTerminalButton = () => {
    const [open, setOpen] = useState(false)
    const onClick = () => {
        setOpen(!open)
    }
    return (
        <div className="px-4 md:px-0">
            <div onClick={onClick} className={`rounded-md text-white text-xs uppercase px-2 py-1 cursor-pointer transition-colors flex items-center gap-x-2 bg-green-600 hover:bg-green-700 w-fit`}>
                <BsTerminal/>
                Terminal
                {open && <RiCloseFill/>}
            </div>
            {
                open &&
                    <div className="rounded-lg my-2 overflow-hidden">
                        <Terminal title="home" executor={global_executor} onClose={onClick} autoFocus/>
                    </div>
            }
        </div>
    )
}

const App = ({ profile, posts, content }: AppProps) => {
    const [loaded_posts, set_loaded_posts] = useState<PostInfo[]>([])
    const [selected_tags, set_selected_tags] = useState<string[]>([])

    const filtered_posts = loaded_posts.filter((post) => {
        if (selected_tags.length <= 0) {
            return true
        }
        let found = true
        for (const tag of selected_tags) {
            if (!post.tags.includes(tag)) {
                found = false
            }
        }
        return found
    })

    const all_tags = new Set(filtered_posts.reduce<string[]>((prev, curr) => { prev.push(...curr.tags); return prev }, []))
    const available_tags = filtered_posts.length > 1 ? Array.from(all_tags).sort().filter(t => !selected_tags.includes(t)) : []

    const onSelectTagHandler = (tag: string) => {
        set_selected_tags(prev => {
            if (!prev.includes(tag)) {
                return [...prev, tag]
            }
            return prev
        })
    }

    const onRemoveTagHandler = (tag: string) => {
        set_selected_tags(prev => {
            return prev.filter(t => t !== tag)
        })
    }

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined = undefined
        
        const promises: Promise<PostInfo>[] = []

        posts.forEach(post => promises.push(load_post(`./posts/${post}.md`)))

        Promise.all(promises).then((posts) => {
            timer = setTimeout(() => {
                set_loaded_posts(prev => {
                    return [...prev, ...posts].sort((a, b) => {
                        return b.date.localeCompare(a.date)
                    })
                })
            }, 1_000)
        }).catch(console.error)

        return () => {
            clearTimeout(timer)
        }
    }, [posts])

    return (
        <div className="max-w-[500px] m-auto grid gap-y-4">
            <div className="md:px-4">
                <Profile profile={profile}/>
                <OpenTerminalButton/>
            </div>
            <div className="px-4">
                {
                    loaded_posts.length > 0 ?
                        <>
                            <Filters
                                tags={available_tags}
                                selected_tags={selected_tags}
                                on_select_tag={onSelectTagHandler}
                                on_remove_tag={onRemoveTagHandler}/>
                            {filtered_posts.length <= 0 && <NoPosts/>}
                            {
                                selected_tags.length > 0 && filtered_posts.length > 0 &&
                                    <div className="text-xs text-slate-500 uppercase font-semibold pb-1">
                                        filtered {filtered_posts.length} post{filtered_posts.length !== 1 && 's'}:
                                    </div>
                            }
                            {filtered_posts.map(p => <Post key={p.id} post={p} profile={profile} content={content}/>)}
                        </> :
                        <>
                            {<FiltersLoading/>}
                            {posts.map(p => <PostLoading key={p}/>)}
                        </>
                }
                <Footer profile={profile}/>
            </div>
        </div>
    )
}

export default App
