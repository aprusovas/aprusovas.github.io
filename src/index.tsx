import ReactDOM from 'react-dom/client';
import App from './components/App';
import Snake from './components/projects/snake/Snake';
import Terminal from './components/projects/terminal/Terminal';
import './index.css';
import { ContentInfo } from './types/content';
import { global_executor } from './utils/commands/registry';
import { profile } from './utils/profile';

/**
 * Root component
 */
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

/**
 * Content
 */
const content: ContentInfo = {
    snake: <Snake/>,
    terminal: <Terminal title="terminal for custom commands" executor={global_executor}/>
}

/**
 * Posts
 */
const posts: string[] = [
    "snake",
    "terminal"
]

root.render(
    <App profile={profile} posts={posts} content={content}/>
)
