import { useEffect, useState } from "react";
import { ProfileInfo } from "../types/profile";

interface ProfileProps {
    /**
     * Profile
     */
    profile: ProfileInfo
}

interface SkillSetProps {
    /**
     * Skills to show
     */
    skills: string[]
}

interface SkillSetCursorProps {
    /**
     * Blink
     */
    blink: boolean
}

const SkillSetCursor = ({ blink }: SkillSetCursorProps) => {
    const [visible, set_visible] = useState(true)
    useEffect(() => {
        if (!blink) {
            set_visible(true)
            return
        }
        
        const timer = setTimeout(() => {
            set_visible(!visible)
        }, 530)

        return () => {
            clearTimeout(timer)
        }
    }, [blink, visible])
    return <div className={`inline border border-r border-r-slate-800 h-[18px] ml-[1px] ${visible ? `visible` : `invisible`}`}></div>
}

const SkillSet = ({ skills }: SkillSetProps) => {
    const [action, set_action] = useState<"add" | "delete">("add")
    const [index, set_index] = useState(0)
    const [text, set_text] = useState<string | null>(null)
    
    useEffect(() => {
        if (text === null) {
            set_text(skills[index])
            return
        }

        let wait_timer: NodeJS.Timeout | undefined = undefined
        const timer = setTimeout(() => {
            switch (action) {
                case "add":
                    if (text.length + 1 > skills[index].length) {
                        wait_timer = setTimeout(() => {
                            set_action("delete")
                        }, 2_000)
                    } else {
                        set_text(skills[index].slice(0, text.length + 1))
                    }
                break
                case "delete":
                    if (text.length - 1 < 0) {
                        wait_timer = setTimeout(() => {
                            set_index((index + 1) % skills.length)
                            set_action("add")
                        }, Math.random() * 500 + 500)
                    } else {
                        set_text(skills[index].slice(0, text.length - 1))
                    }
                break
            }
        }, 50)

        return () => {
            clearTimeout(wait_timer)
            clearTimeout(timer)
        }
    }, [action, index, skills, text, text?.length])

    return (
        <div className="items-center contents">
            {text}
            {<SkillSetCursor blink={skills[index] === text || (text?.length ?? 0) <= 0}/>}
        </div>
    )
}

const Profile = ({ profile }: ProfileProps) => {
    return (
        <>
            <div className="pt-12 pb-8 md:pb-4 flex items-center text-left px-4 md:px-0 md:gap-x-2">
                <div className="grow pt-4 pr-32 md:pt-0 lg:pr-0">
                    <div className="text-black font-extrabold text-2xl pt-1 pb-3">{profile.title}</div>
                    <div className="text-slate-700 font-medium">
                        <div className="pb-2">
                            {profile.description}
                        </div>
                        <div className="pb-2">
                            {profile.description_longer}
                            <SkillSet skills={profile.skills.map(s => `${s}.`)}/>
                        </div>
                    </div>
                </div>
            </div>
            <img src={profile.picture_bg} alt="Profile" className="fixed right-0 bottom-0 h-[95vh] md:h-[100vh] -z-10 translate-x-1/2 lg:translate-x-1/3 max-w-fit"/>
        </>
    )
}

export default Profile