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
        <div onClick={() => { window.open(url, '_blank') }} className="text-slate-700 hover:text-slate-800 hover:bg-slate-200 bg-slate-100 rounded-full cursor-pointer w-9 h-9 flex items-center justify-center">
            {icon}
        </div>
    )
}

const Footer = ({ profile }: FooterProps) => {
    return (
        <>
            <div className="px-4 md:px-0 flex gap-1 flex-wrap justify-center pt-16">
                {profile.badges.skills.map(b => <img className="rounded-md overflow-hidden" src={b} key={b} alt={b}/>)}
            </div>
            <div className="px-4 md:px-0 flex gap-1 flex-wrap justify-center pt-8">
                {profile.badges.other.map(b => <img className="rounded-md overflow-hidden" src={b} key={b} alt={b}/>)}
            </div>
            <div className="py-8">
                <div className="flex justify-center pt-8 gap-x-1">
                    { profile.urls.github && <Link icon={<BsGithub/>} url={profile.urls.github}/> }
                    { profile.urls.linkedin && <Link icon={<BsLinkedin/>} url={profile.urls.linkedin}/> }
                    { profile.urls.facebook && <Link icon={<BsFacebook/>} url={profile.urls.facebook}/> }
                </div>
                <div className="text-center py-4 text-slate-500 text-xs">
                    © {new Date().getFullYear()} Aurimas Prusovas
                </div>
            </div>
        </>
    )
}

export default Footer