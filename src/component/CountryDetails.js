import React from 'react'
import { useQuery, gql } from '@apollo/client';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams} from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
export default function CountryDetails() {
  const {code}=useParams();
  const GET_COUNTRY = gql`
    query Country($code:ID!){
      country(code: $code) {
        name
        native
        emoji
        currency
        languages {
          code
          name
        }
      }
    }
`;

const { loading, error, data} = useQuery(GET_COUNTRY,{variables:{code}});

  if (loading) return <SyncLoader color="#36d7b7" />;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <Box
    component="span"
    sx={{ mx: '2px', transform: 'scale(0.8)' }}
  >
  <Card sx={{ minWidth: 275,margin:2 }} key={data.country.emoji}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       Country Name:{data.country.name}
      </Typography>
      <Typography variant="h5" component="div">
       Country Name: {data.country.name}<br/>
       Country native: {data.country.native}<br/>
       Country emoji": {data.country.emoji}<br/>
       Country currency": {data.country.currency}<br/>    
       Country languages": 
       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {data.country.languages.map((language) => (
        <ListItem
          key={language.code}
          disableGutters
          
        >
          <ListItemText primary={`-----${language.name}-${language.code}`} />
        </ListItem>
      ))}
    </List>
      </Typography>
    </CardContent>
    
  </Card>
</Box>
  )
}
