import React from 'react';
import RecipeCard from '../components/RecipeCard';
import { Grid } from 'semantic-ui-react';

export default function SearchResult({data}) {
  const value = data.map((recipe) => {
    return <RecipeCard recipe={recipe} />
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
      <Grid container>
        <Grid.Row children>
          <Grid>
            {value}
          </Grid>
        </Grid.Row>
      </Grid>
    </div>
  );
}
