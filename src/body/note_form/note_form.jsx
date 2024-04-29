// note_form.js
import './note_form.css';
import React, { useState } from 'react';

function NoteForm({addArticle, archives}) {
    const [author, setAuthor] = useState('');
    const [header, setHeader] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [articles, setArticles] = useState([]);

    const onChangeAuthor = (e) => {
        setAuthor(e.target.value);
    };

    const onChangeHeader = (e) => {
        setHeader(e.target.value);
    };

    const onChangeCategory = (e) => {
        setCategory(e.target.value);
    };

    const onChangeContent = (e) => {
        setContent(e.target.value);
    };

    const handleAddArticle = () => {
        const newArticle = {
            author: author,
            header: header,
            category: category,
            content: content
        };
        addArticle(newArticle); 
        setAuthor('');
        setHeader('');
        setCategory('');
        setContent('');
    };


    return (
        <div className='note_form_wrapper'>
            <div className='main_col'>
                <h1 id='head_form_title'>
                    Создать запись
                </h1>
                <hr />
                <p>Автор</p>
                <input
                    type="text"
                    value={author}
                    onChange={onChangeAuthor}
                    placeholder="Иван Иванов"
                    className="custom-input" 
                />
                <p>Заголовок</p>
                <input
                    type="text"
                    value={header}
                    onChange={onChangeHeader}
                    placeholder="Марк Цукерберг продемонстрировал работу"
                    className="header-input" 
                />
                <p>Категория</p>
                <input
                    type="text"
                    value={category}
                    onChange={onChangeCategory}
                    placeholder="Технологии"
                    className="custom-input" 
                />
                <p>Содержание</p>
                <textarea
                    value={content}
                    onChange={onChangeContent}
                    placeholder="Введите содержание..."
                    className='content-input' 
                    rows="5"
                ></textarea>
                <button onClick={handleAddArticle}>Добавить статью</button>
                <h1 id='head_form_title'>
                    Архив
                </h1>
                <hr />
                <div className="archive">
                    <ul className="black-ol">
                        {archives.map((archive, index) => (
                            <li key={index}>{archive.header}</li>
                        ))}
                    </ul>
                </div>

            </div>
            
        </div>
    );
}

export default NoteForm;
