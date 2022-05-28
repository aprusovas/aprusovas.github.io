import ReactDOM from 'react-dom/client';
import App from './components/App';
import Snake from './components/projects/snake/Snake';
import './index.css';
import { ContentInfo } from './types/content';
import { ProfileInfo } from './types/profile';

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
    picture: "/img/profile.png",
    urls: {
        linkedin: "https://www.linkedin.com/in/aurimas-prusovas-713276212/",
        facebook: "https://www.facebook.com/aurimas.prusovas/",
        github: "https://github.com/aprusovas"
    },
    badges: {
        skills: [
            "https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white",
            "https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white",
            "https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white",
            "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black",
            "https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white",
            "https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E",
            "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white",
            "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white",
            "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white",
            "https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white",
            "https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white",
            "https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white",
            "https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white",
            "https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white",
            "https://img.shields.io/badge/Lua-2C2D72?style=for-the-badge&logo=lua&logoColor=white",
            "https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white",
            "https://img.shields.io/badge/Express.js-404D59?style=for-the-badge",
            "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB",
            "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white",
            "https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white",
            "https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white",
            "https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white",
            "https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white",
            "https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white",
            "https://img.shields.io/badge/Unity-100000?style=for-the-badge&logo=unity&logoColor=white",
            "https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white"
        ],
        other: [
            "https://img.shields.io/badge/Microsoft_Teams-6264A7?style=for-the-badge&logo=microsoft-teams&logoColor=white",
            "https://img.shields.io/badge/Bitbucket-0747a6?style=for-the-badge&logo=bitbucket&logoColor=white",
            "https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white",
            "https://img.shields.io/badge/GitLab-330F63?style=for-the-badge&logo=gitlab&logoColor=white",
            "https://img.shields.io/badge/Sourcetree-0052CC?style=for-the-badge&logo=Sourcetree&logoColor=white",
            "https://img.shields.io/badge/Alpine_Linux-0D597F?style=for-the-badge&logo=alpine-linux&logoColor=white",
            "https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white",
            "https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white",
            "https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white",
            "https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=apple&logoColor=white",
            "https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white",
            "https://img.shields.io/badge/mocha.js-323330?style=for-the-badge&logo=mocha&logoColor=Brown",
            "https://img.shields.io/badge/Google%20Analytics-E37400?style=for-the-badge&logo=google%20analytics&logoColor=white",
            "https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white",
            "https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white",
            "https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white",
            "https://img.shields.io/badge/Visual_Studio-5C2D91?style=for-the-badge&logo=visual%20studio&logoColor=white",
            "https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white",
            "https://img.shields.io/badge/Xcode-007ACC?style=for-the-badge&logo=Xcode&logoColor=white",
            "https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white",
            "https://img.shields.io/badge/Cordova-35434F?style=for-the-badge&logo=apache-cordova&logoColor=E8E8E8",
            "https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB",
            "https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white",
            "https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white",
            "https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white",
            "https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white"
        ]
    }
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
