const year = new Date().getFullYear()
const Footer = () => {
    return (
        <div className="text-center p-8 text-slate-400 text-xs">
            © {year} Aurimas Prusovas
        </div>
    )
}

export default Footer