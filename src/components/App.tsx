import logo from "../img/logo.svg"
import Post from './Post';
import PrintTextAnim, { PrintTextAnimDefaultDelay } from "./PrintTextAnim";
import Snake from "./projects/snake/Snake";

const TITLE = "Hi. I’m Aurimas."
const BODY = "I’m a designer working on the Human Interface Team at Apple. My passion is to create emotional experiences at the intersection of art, design, and AI."

const App = () => {
    return (
        <div className="max-w-[500px] m-auto p-4 grid gap-y-4">
            {/* <div className="py-8">
                <div className="text-6xl">
                    <PrintTextAnim text={TITLE}/>
                </div>
                <div className='font-sm'>
                    <PrintTextAnim text={BODY} initial_delay={TITLE.length * PrintTextAnimDefaultDelay}/>
                </div>
            </div> */}
            <Post>
                <Snake/>
            </Post>
            {/* <Post>
                Post #2
            </Post>
            <Post>
                Post #3
            </Post>
            <div>
                <img src={logo} alt="Logo" className='m-auto w-32 h-32 my-8'/>
            </div> */}
        </div>
    )
}

export default App
