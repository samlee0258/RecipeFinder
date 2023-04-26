import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import Favorites from './pages/Favorites';
import backgroundImage from '../src/pages/serge-le-strat-rS4OSc9yhSo-unsplash.jpg';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  // console.log(window.location);
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const APP_ID = process.env.REACT_APP_ID;
  const APP_KEY = process.env.REACT_APP_API_KEY;
  const RECIPE_URL = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${search}`;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(RECIPE_URL);
      console.log('response:', response)
      if (!response.ok) {
        throw new Error(400, 'recipe not found');
      }
      const jsonData = await response.json();
      setRecipes(jsonData.hits);
      console.log('data:', jsonData.hits)
    } catch (err) {
      console.error('Error:', err);
    }
    navigate('/search-result');
  };

  return (
    <div className="App"
         style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          width: '100%',
          minHeight: '100vh'
      }}
    >
      <Navbar />
      <div>
        <Routes>
          <Route path='/' element={<Home onChange={handleChange} onSubmit={handleSubmit} />} />
          <Route path='/search-result' element={<SearchResult data={recipes} />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
