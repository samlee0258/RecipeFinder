import React from 'react';
import './Home.css';

export default function Home({onChange, onSubmit}) {
  return (
    <div className="home-page">
      <h1>RecipeFinder</h1>
      <form onSubmit={onSubmit}>
        <input type="search" className='searchInput' onChange={onChange} placeholder='Search' required />
        <button type='submit' className='searchBttn'>Search</button>
        {/* {recipes.map((recipe) => <p>{recipe.recipe.label}</p>)} */}
      </form>
    </div>
  )
}
