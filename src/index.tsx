import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Snake from './components/projects/snake/Snake';
import './index.css';
import { PostInfo } from './types/post';
import { ProfileInfo } from './types/profile';
import { ContentInfo } from './types/content';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

const content: ContentInfo = {
    snake: <Snake/>
}

const profile: ProfileInfo = {
    title: 'Hi 👋',
    description: 'This is my random stuff ..',
    picture: "/img/profile.jpg"
}

const posts: PostInfo[] = [{
    id: 'snake',
    title: "Snake",
    description: "It's time for Snake time! This time I made classic Snake game using HTML5 canvas. Just for fun.",
    screenshot: "snake.png",
    tags: [
        "game",
        "snake",
        "html5"
    ],
    date: '2022-05-26'
}]

root.render(
    <React.StrictMode>
        <App profile={profile} posts={posts} content={content}/>
    </React.StrictMode>
)
