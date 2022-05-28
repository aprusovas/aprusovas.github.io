import { useEffect, useState } from "react";
import { ProfileInfo } from "../types/profile";
import { ContentInfo } from "../types/content";
import Filters, { FiltersLoading } from "./Filters";
import Footer from "./Footer";
import Post, { PostLoading } from './Post';
import Profile from "./Profile";
import { BsClipboard } from 'react-icons/bs';
import { PostInfo } from "../types/post";

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
    
    data.attributes.date = new Date(data.attributes.date).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    
    return { ...data.attributes, ...{ content: data.body } } as PostInfo
}

const NoPosts = () => {
    return (
        <div className="text-center text-xl font-semibold text-slate-600 py-16">
            <BsClipboard className="m-auto text-6xl pb-2"/>
            <div>No posts found..</div>
        </div>
    )
}

const App = ({ profile, posts, content }: AppProps) => {
    const [loaded_posts, set_loaded_posts] = useState<PostInfo[]>([])
    const [selected_tags, set_selected_tags] = useState<string[]>([])

    const all_tags = new Set(loaded_posts.reduce<string[]>((prev, curr) => { prev.push(...curr.tags); return prev }, []))
    const available_tags = Array.from(all_tags).sort().filter(t => !selected_tags.includes(t))
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
        const promises: Promise<PostInfo>[] = []
        posts.forEach(path => promises.push(load_post(path)))
        Promise.all(promises).then((posts) => {
            set_loaded_posts(prev => {
                return [...prev, ...posts].sort((a, b) => {
                    return b.date.localeCompare(a.date)
                })
            })
        }).catch(console.error)
    }, [posts])

    return (
        <div className="max-w-[500px] m-auto grid gap-y-4">
            <div className="md:px-4">
                <Profile profile={profile}/>
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
                            {filtered_posts.map(p => <Post key={p.id} post={p} profile={profile} content={content}/>)}
                        </> :
                        <>
                            <FiltersLoading/>
                            {posts.map(p => <PostLoading key={p}/>)}
                        </>
                }
                <Footer profile={profile}/>
            </div>
        </div>
    )
}

export default App
