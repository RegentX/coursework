import './App.css';
import Header from './header/main/header';
import Note from './body/notes/note';
import NoteForm from './body/note_form/note_form';
import { fetchCryptoData } from './store/cruptoSlice';
import RunningHeader from './header/low/runningTitle';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_ARTICLE, ADD_ARCHIVE } from './store/store';
import React, { useEffect } from 'react';

function App() {

  const articles = useSelector(state => state.articles);
  const archives = useSelector(state => state.archives);
  const dispatch = useDispatch();

  const handleAddArticle = (newArticle) => {
    dispatch({ type: ADD_ARTICLE, payload: newArticle });
  };

  const handleAddArchive = (newArchive) => {
    dispatch({ type: ADD_ARCHIVE, payload: newArchive });
  }

  const cryptos = useSelector(state => state.crypto.data);

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  // const [articles, setArticles] = useState([]);

  // const [archives, setArchive] = useState([]);

  // const addArticle = (newArticle) => {
  //   setArticles([...articles, newArticle]);
  // };

  // const addArchive = (newArchive) => {
  //   setArchive([...archives, newArchive]);
  // }

  console.log(articles);
  console.log('in main');
  return (
    <div className="App">
      
        {
      <div>
      <Header />
          <div>
            <RunningHeader cryptos={cryptos} />
          </div>
      <div className="main-wrap">
        <div className="left-panel">
          <Note articles={articles} addArchive={handleAddArchive} archives={archives}/>
        </div>
        <div className="right-panel">
          <NoteForm addArticle={handleAddArticle} archives={archives}/>
        </div>
      </div>
      </div>
      }

      
      

    </div>
  );
}

export default App;
