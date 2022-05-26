import { ProfileInfo } from "../types/profile"

interface ProfileProps {
    profile: ProfileInfo
}

const Profile = ({ profile }: ProfileProps) => {
    return (
        <div className="pt-8 md:pt-12 pb-8 md:pb-4 md:flex md:items-center text-center md:text-left bg-white md:bg-transparent px-4 md:px-0 border-b-4 border-slate-300/50 md:border-0">
            <img src={profile.picture} alt="Profile" className="w-1/2 aspect-square md:aspect-auto md:w-20 md:h-20 mx-auto mb-8 md:mb-0 md:m-2 rounded-full ring-4 md:ring-2 ring-zinc-300/50 md:ring-white"/>
            <div className="grow">
                <div className="text-slate-800 font-extrabold text-2xl md:px-4 py-1">{profile.title}</div>
                <div className="text-slate-700 font-medium md:px-4">{profile.description}</div>
            </div>
        </div>
    )
}

export default Profile