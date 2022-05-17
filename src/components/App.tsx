import Elapsed from './Elapsed';

const App = () => {
    return (
        <div className="text-center w-full py-16">
            <div className="text-4xl font-mono font-bold">
                <Elapsed date={new Date("2013-01-16")}/>
            </div>
        </div>
    )
}

export default App
