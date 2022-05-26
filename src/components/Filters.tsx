import { RiCloseFill } from 'react-icons/ri';

interface FilterProps {
    name: string
    remove?: boolean
    onClick: () => void
}

interface FiltersProps {
    tags: string[]
    selected_tags: string[]
    on_select_tag: (tag: string) => void
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

const Filters = ({ tags, selected_tags, on_select_tag, on_remove_tag }: FiltersProps) => {
    return (
        <div className="py-4">
            {
                selected_tags.length > 0 &&
                    <>
                        <div className="text-xs text-slate-500 uppercase font-semibold pb-1">Selected</div>
                        <div className="flex gap-1 pb-4">
                            {selected_tags.map(t => <Filter key={t} name={t} onClick={() => { on_remove_tag(t) }} remove/>)}
                        </div>
                    </>
            }
            {
                tags.length > 0 &&
                    <>
                        <div className="text-xs text-slate-500 uppercase font-semibold pb-1">{selected_tags.length > 0 && 'Available '}filters</div>
                        <div className="flex gap-1">
                            {tags.map(t => <Filter key={t} name={t} onClick={() => { on_select_tag(t) }}/>)}
                        </div>
                    </>
            }
        </div>
    )
}

export default Filters