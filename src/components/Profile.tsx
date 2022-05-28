import { ProfileInfo } from "../types/profile"

interface ProfileProps {
    /**
     * Profile
     */
    profile: ProfileInfo
}

const Profile = ({ profile }: ProfileProps) => {
    return (
        <>
            <div className="pt-12 pb-8 md:pb-4 flex items-center text-left px-4 md:px-0 md:gap-x-2">
                <div className="grow pt-4 md:pt-0">
                    <div className="text-slate-800 font-extrabold text-2xl py-1">{profile.title}</div>
                    <div className="text-slate-700 font-medium">{profile.description}</div>
                </div>
            </div>
            <img src={profile.picture} alt="Profile" className="fixed right-0 bottom-0 h-full -z-10 translate-x-1/2 md:translate-x-1/3" style={{ maxWidth: 'fit-content' }}/>
        </>
    )
}

export default Profile