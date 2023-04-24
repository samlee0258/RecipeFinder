// import React, { useState } from 'react';
import './Home.css';
// import 'dotenv/config';

export default function Home() {
  // const [ search, setSearch ] = useState('');
  // const [ data, setData ] = useState(null);
  // console.log(data);

  // const handleChange = (e) => {
  //   setSearch(e.target.value);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const APP_ID = process.env.REACT_APP_ID;
  //   const APP_KEY = process.env.REACT_APP_API_KEY;
  //   try {
  //     const response = await fetch(`https://api.edamam.com/api/recipes/v2/search?app_id=${APP_ID}&app_key=${APP_KEY}&q=${search}`)
  //     const data = await response.json();
  //     setData(data);
  //   } catch (err) {
  //     console.error('Error:', err);
  //   }
  // };

  return (
    <div className="home-page">
      <h1>RecipeFinder</h1>
      <form>
        <input type="text" className='searchInput' placeholder='Search'/>
        <button className='searchBttn'>Search</button>
      </form>
    </div>
  )
}
