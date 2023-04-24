// import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import Favorites from './pages/Favorites';
import backgroundImage from '../src/pages/serge-le-strat-rS4OSc9yhSo-unsplash.jpg';
import { Route, Routes } from 'react-router-dom';

function App() {
  // console.log(window.location);

  return (
    <div className="App"
         style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          width: '100%',
          height: '100vh'
      }}
    >
      <Navbar />
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search-result' element={<SearchResult />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
