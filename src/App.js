import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import withListLoading from './components/withListLoading';

function App() {
  const ListLoading = withListLoading(List);
  const [appState, setAppState] = useState({
    loading: false,
    api: null,
  });

useEffect(()=> {
setAppState({ loading:true});
const apiUrl = 'https://introappdev.herokuapp.com/api/movies';
fetch(apiUrl)
  .then((res) => res.json())
  .then((api) => {
setAppState({ loading: false, api: api });
});
}, [setAppState]);
return (
  <div className='App'>
    <div className='container'>
    </div>
    <div className='api-container'>
        <ListLoading isLoading={appState.loading} api={appState.api} />
      </div>
  </div>
)
}
export default App;
