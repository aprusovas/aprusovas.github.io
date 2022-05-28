import { RiCloseFill } from 'react-icons/ri';
import { ReactNode } from 'react-markdown/lib/react-markdown';

interface FilterProps {
    /**
     * Name
     */
    name: ReactNode
    /**
     * Have `remove` icon
     */
    remove?: boolean
    /**
     * On filter click
     */
    onClick?: () => void
}

interface FiltersProps {
    /**
     * Available filters list
     */
    tags: string[]
    /**
     * Selected filters list
     */
    selected_tags: string[]
    /**
     * On select tag callback
     */
    on_select_tag: (tag: string) => void
    /**
     * On remove tag callback
     */
    on_remove_tag: (tag: string) => void
}

const Filter = ({ name, remove, onClick }: FilterProps) => {
    return (
        <div onClick={onClick} className={`rounded-md text-white text-xs uppercase px-2 py-1 cursor-pointer transition-colors flex items-center gap-x-2 ${remove ? `bg-red-400 hover:bg-red-500` : `bg-slate-600 hover:bg-slate-900`}`}>
            {name}
            {remove && <RiCloseFill/>}
        </div>
    )
}

export const FiltersLoading = () => {
    return (
        <div className="py-4">
            <div className="text-xs text-slate-500 uppercase font-semibold pb-1">filters</div>
            <div className="flex gap-1">
                <Filter name={<div className="w-8 h-4"></div>}/>
                <Filter name={<div className="w-6"></div>}/>
            </div>
        </div>
    )
}

const Filters = ({ tags, selected_tags, on_select_tag, on_remove_tag }: FiltersProps) => {
    return (
        <div className="py-4">
            {
                selected_tags.length > 0 &&
                    <>
                        <div className="text-xs text-slate-500 uppercase font-semibold pb-1">selected</div>
                        <div className="flex gap-1 pb-4">
                            {selected_tags.map(t => <Filter key={t} name={t} onClick={() => { on_remove_tag(t) }} remove/>)}
                        </div>
                    </>
            }
            {
                tags.length > 0 &&
                    <>
                        <div className="text-xs text-slate-500 uppercase font-semibold pb-1">{selected_tags.length > 0 && 'available '}filters</div>
                        <div className="flex gap-1">
                            {tags.map(t => <Filter key={t} name={t} onClick={() => { on_select_tag(t) }}/>)}
                        </div>
                    </>
            }
        </div>
    )
}

export default Filters