import { ReactNode } from "react"
import { ProfileInfo } from "../types/profile"
import { BsFacebook, BsGithub, BsLinkedin } from 'react-icons/bs';

interface LinkProps {
    icon: ReactNode
    url: string
}

interface FooterProps {
    profile: ProfileInfo
}

const Link = ({ icon, url }: LinkProps) => {
    return (
        <div onClick={() => { window.open(url, '_blank') }} className="text-slate-700 hover:text-slate-800 hover:bg-slate-200 bg-slate-100 rounded-full cursor-pointer w-9 h-9 flex items-center justify-center transition-all">
            {icon}
        </div>
    )
}

const Footer = ({ profile }: FooterProps) => {
    const text_shadow_styles = {
        textShadow: '0px 1px 0px rgb(255 255 255), 0px -1px 0px rgb(255 255 255), -1px 0px 0px rgb(255 255 255), 1px 0px 0px rgb(255 255 255)'
    }
    return (
        <>
            <div className="text-center py-4 text-black text-2xl font-extrabold uppercase pt-8 tracking-widest" style={text_shadow_styles}>
                Skills
            </div>
            <div className="px-4 md:px-0 flex gap-1 flex-wrap justify-center">
                {profile.badges.skills.map(b => <img className="rounded-md overflow-hidden h-5 md:h-auto" src={b} key={b} alt={b}/>)}
            </div>
            <div className="text-center py-4 text-black text-2xl font-extrabold uppercase pt-16 tracking-widest" style={text_shadow_styles}>
                Tools, Platforms & More
            </div>
            <div className="px-4 md:px-0 flex gap-1 flex-wrap justify-center">
                {profile.badges.other.map(b => <img className="rounded-md overflow-hidden h-5 md:h-auto" src={b} key={b} alt={b}/>)}
            </div>
            <div className="py-8">
                <div className="flex justify-center pt-8 gap-x-2">
                    { profile.urls.github && <Link icon={<BsGithub/>} url={profile.urls.github}/> }
                    { profile.urls.linkedin && <Link icon={<BsLinkedin/>} url={profile.urls.linkedin}/> }
                    { profile.urls.facebook && <Link icon={<BsFacebook/>} url={profile.urls.facebook}/> }
                </div>
                <div className="text-center py-4 text-black text-xs" style={text_shadow_styles}>
                    © {new Date().getFullYear()} Aurimas Prusovas
                </div>
            </div>
        </>
    )
}

export default Footer