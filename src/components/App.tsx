import { useState } from "react";
import { PostInfo } from "../types/post";
import { ProfileInfo } from "../types/profile";
import { ContentInfo } from "../types/content";
import Filters from "./Filters";
import Footer from "./Footer";
import Post from './Post';
import Profile from "./Profile";
import { BsClipboard } from 'react-icons/bs';
interface AppProps {
    profile: ProfileInfo
    posts: PostInfo[]
    content: ContentInfo
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
    const [selected_tags, set_selected_tags] = useState<string[]>([])
    const all_tags = new Set(posts.reduce<string[]>((prev, curr) => { prev.push(...curr.tags); return prev }, []))
    const available_tags = Array.from(all_tags).sort().filter(t => !selected_tags.includes(t))
    const filtered_posts = posts.filter((post) => {
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
            console.log(tag)
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

    return (
        <div className="max-w-[500px] m-auto grid gap-y-4">
            <div className="md:px-4">
                <Profile profile={profile}/>
            </div>
            <div className="px-4">
                <Filters
                    tags={available_tags}
                    selected_tags={selected_tags}
                    on_select_tag={onSelectTagHandler}
                    on_remove_tag={onRemoveTagHandler}/>
                {filtered_posts.length <= 0 && <NoPosts/>}
                {filtered_posts.map(p => <Post key={p.id} post={p} profile={profile} content={content}/>)}
                <Footer/>
            </div>
        </div>
    )
}

export default App
