import React from 'react';
import './App.scss';
import CountupCards from './components/CountupCards/CountupCards';
import AddNew from './components/AddNew/AddNew';

function App() {
  return (
    <div className="App">
      <h1>Time Since I</h1>
      <CountupCards></CountupCards>
    </div>
  );
}

export default App;
