import React, { useState } from 'react';
import './css/blog.css';
import { Remarkable } from 'remarkable';

const md = new Remarkable();

const BlogPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [tag, setTag] = useState('');
    const [text, setText] = useState('');

    return (
        <div className="blog-container">
            <div className="blog-content">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your content in Markdown format"
                />
                <div
                    className="rendered-content"
                    dangerouslySetInnerHTML={{ __html: md.render(text) }}
                />
            </div>
            <div className="author-box">
                <img src="/path-to-author-image.jpg" alt="Author" />
                <h2>Author Name</h2>
                <p>Some details about the author.</p>
            </div>
        </div>
        );
};

export default BlogPage;
