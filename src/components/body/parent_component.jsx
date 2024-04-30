// ParentComponent.js
import React, { useState } from 'react';
import NoteForm from './NoteForm';
import Note from './Note';

function ParentComponent() {
    const [articles, setArticles] = useState([]);

    return (
        <div>
            <NoteForm articles={articles} setArticles={setArticles} />
            <Note articles={articles} />
        </div>
    );
}

export default ParentComponent;
