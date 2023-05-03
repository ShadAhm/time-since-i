import React from 'react';
import './App.scss';
import CountupCards from './components/CountupCards/CountupCards';

function App() {
  return (
    <>
      <div className="main-content">
        <h1>Time Since I</h1>
        <CountupCards></CountupCards>
      </div>
      <footer>
        <p>Made by <a href="https://shadahm.github.io">Shad Ahm</a> for learning purposes only. Use at your own risk.</p>
        <p>For code see the <a href="https://github.com/ShadAhm/time-since-i">Github repo</a>.</p>
      </footer>
    </> 
  );
}

export default App;
