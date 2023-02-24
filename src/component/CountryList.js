import React from 'react'
import { useQuery, gql } from '@apollo/client';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
export default function CountryList() {
  const CountryList = gql`
  {
    countries {
    code  
    name
    native
    capital
    emoji
    currency
    languages {
      code
      name
    }
  }
}
`;
const { loading, error, data} = useQuery(CountryList);

  if (loading) return <SyncLoader color="#36d7b7" />;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <Box
    component="span"
    sx={{ mx: '2px', transform: 'scale(0.8)' }}
  >
  {data.countries.map((country) => (
  <Card sx={{ minWidth: 275,margin:2 }} key={country.emoji}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       Country code:{country.emoji}
      </Typography>
      <Typography variant="h5" component="div">
       Country Name: {country.name}
      </Typography>
    </CardContent>
    <CardActions>
    
    <Link to={'details/'+country.code}>
      Country Details
      </Link>
    </CardActions>
  </Card>
  ))}
</Box>
  )
}
