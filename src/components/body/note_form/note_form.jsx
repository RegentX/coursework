import './note_form.css';
import React, { useState } from 'react';
import CryptoDropdown from '../../utils/cryptoDropdown';

function NoteForm({ addArticle, archives, apiUrl, refreshInterval }) {
    const [author, setAuthor] = useState('');
    const [header, setHeader] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [selectedCrypto, setSelectedCrypto] = useState('');
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
            content: content,
            crypto: selectedCrypto
        };
        addArticle(newArticle); 
        setAuthor('');
        setHeader('');
        setCategory('');
        setContent('');
        setSelectedCrypto(null);
    };

    const handleCryptoSelect = (crypto) => { 
        setSelectedCrypto(crypto);
        console.log(crypto);
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
                <CryptoDropdown apiUrl={apiUrl} refreshInterval={refreshInterval} onCryptoSelect={handleCryptoSelect} />
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
