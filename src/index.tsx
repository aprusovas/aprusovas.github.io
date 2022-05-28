import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Snake from './components/projects/snake/Snake';
import './index.css';
import { ProfileInfo } from './types/profile';
import { ContentInfo } from './types/content';

/**
 * Root component
 */
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

/**
 * Profile information
 */
const profile: ProfileInfo = {
    title: 'Hi 👋',
    description: 'This is my random stuff ..',
    picture: "/img/profile.jpg"
}

/**
 * Content
 */
const content: ContentInfo = {
    snake: <Snake/>
}

/**
 * Posts
 */
const posts: string[] = [
    "./posts/snake.md"
]

root.render(
    <App profile={profile} posts={posts} content={content}/>
)