import { ProfileInfo } from "../types/profile"

interface ProfileProps {
    /**
     * Profile
     */
    profile: ProfileInfo
}

const Profile = ({ profile }: ProfileProps) => {
    return (
        <div className="pt-8 md:pt-12 pb-8 md:pb-4 md:flex md:items-center text-center md:text-left px-4 md:px-0 md:gap-x-2">
            <div className="relative m-auto w-48 h-48 md:w-20 md:h-20">
                <img src={profile.picture} alt="Profile" className="rounded-full ring-4 md:ring-2 ring-white"/>
                <div className="absolute right-[1rem] bottom-[1rem] md:right-[0.25rem] md:bottom-[0.25rem] bg-green-600 w-5 h-5 md:w-3 md:h-3 rounded-full ring-4 md:ring-2 ring-white"></div>
            </div>
            <div className="grow pt-4 md:pt-0">
                <div className="text-slate-800 font-extrabold text-2xl md:px-4 py-1">{profile.title}</div>
                <div className="text-slate-700 font-medium md:px-4">{profile.description}</div>
            </div>
        </div>
    )
}

export default Profile