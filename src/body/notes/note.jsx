import './note.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteArticle } from '../../store';

function Note({articles, addArchive, archives}) {
    console.log(articles);
    console.log('90090990900');

    const dispatch = useDispatch();

    const handleDelete = (index) => {
        dispatch(deleteArticle(index));
    };

    const handleArchive = (index) => {
        const header = articles[index].header;

        const isAlreadyArchived = archives.some(archive => archive.header === header);

        if (!isAlreadyArchived) {
            const newArchive = {
                header: header,
            };
            addArchive(newArchive);
        }
        handleDelete(index);
    };


    return (
        <div className='note_wrapper'>
            <h1 id='head_title'>
                Записи
            </h1>
            <hr />

            <div className="articles">
                {articles.map((article, index) => (
                    <article key={index}>
                        <div className='atricle-text'>
                            <h1>{article.header}</h1>
                            <p className='textOne'>Категория: <strong>{article.category}</strong></p>
                            <p className='textOne'>Автор: <strong>{article.author}</strong></p>
                            <p className='textOne'>{article.content}</p>
                        </div>
                        
                        <div className="buttons">
                            <button onClick={() => handleDelete(index)}>Delete</button>
                            <button onClick={() => handleArchive(index)}>Archive</button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Note;