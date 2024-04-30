import './App.css';
import Header from './components/header/main/header';
import Note from './components/body/notes/note';
import NoteForm from './components/body/note_form/note_form';
import { fetchCryptoData } from './store/cruptoSlice';
import RunningHeader from './components/header/low/runningTitle';
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

  // const cryptos = useSelector(state => state.crypto.data);

  // useEffect(() => {
  //   dispatch(fetchCryptoData());
  // }, [dispatch]);

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
            <RunningHeader apiUrl="https://api.coincap.io/v2/assets" refreshInterval={10000} />
          </div>
      <div className="main-wrap">
        <div className="left-panel">
          <Note articles={articles} addArchive={handleAddArchive} archives={archives}/>
        </div>
        <div className="right-panel">
              <NoteForm addArticle={handleAddArticle} archives={archives} apiUrl="https://api.coincap.io/v2/assets" refreshInterval={30000}/>
        </div>
      </div>
      </div>
      }

      
      

    </div>
  );
}

export default App;
