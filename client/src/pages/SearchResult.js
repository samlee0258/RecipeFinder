import React from 'react';
import RecipeCard from '../components/RecipeCard';
import { Grid } from 'semantic-ui-react';

export default function SearchResult({data}) {
  console.log(data);
  const value = data.map((recipe) => {
    return (
      <Grid.Column>
        <RecipeCard recipe={recipe} />
      </Grid.Column>
    )
  })

  return (
    <div>
      <h1 style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: 'white',
                  WebkitTextStroke: '1px black'
                }}
      >
        Search Result
      </h1>
      <Grid container stackable doubling columns={4}>
        {value}
      </Grid>
    </div>
  );
}
