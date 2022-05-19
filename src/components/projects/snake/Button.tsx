const Button = ({ name, onClick }: { name: string, onClick: () => void }) => {
    return (
        <div onClick={onClick} className="bg-green-500 rounded-md p-2 text-4xl cursor-pointer hover:bg-green-600 hover:scale-105 min-w-[150px] text-center font-mono transition-all">
            {name}
        </div>
    )
}

export default Button