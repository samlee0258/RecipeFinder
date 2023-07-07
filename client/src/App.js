import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import Favorites from './pages/Favorites';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const APP_ID = process.env.REACT_APP_ID;
const APP_KEY = process.env.REACT_APP_API_KEY;

function App() {

  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${search}`);
      if (!response.ok) {
        throw new Error(response.text);
      }
      const jsonData = await response.json();
      setRecipes(jsonData.hits.slice(0, 20));
    } catch (err) {
      console.error('Error:', err);
    }
    navigate('/search-result');
  };

  return (
    <div className="App">
      <Navbar />
      <div>
        <Routes>
          <Route path='/' element={<Home onChange={handleChange} onSubmit={handleSubmit} />} />
          <Route path='/search-result' element={<SearchResult recipes={recipes} setRecipes={setRecipes} />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
