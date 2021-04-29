import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';

//Komponentin omaa tyyliä
const useStyles = makeStyles({
  card: {
    marginTop: 15, 
    maxWidth: 200, minWidth: 200,
    color: green[700],
  },
  image: {
    height: 100,
    width: 170,
  },
  typo: {
    height: 75, 
    width: 170,
  },
  button: {
    textAlign: 'center',
  },
  icon: {
    color: pink[200],
  }
});

function BooklistMui (props) {
    const classes = useStyles();
  
    return (
    <Grid container spacing={4}>
      { props.books.map(books => {
        
          return (
             <Grid item key={ book.id }>
               <Card className={ classes.card }>
               <CardHeader
                 title={ book.title.toUpperCase() } />
               <CardContent>
                  <Typography>{ book.author }</Typography>
                  <Typography>{ book.description }</Typography>
                </CardContent>
               </Card>
             </Grid>
          )
        })
     }
     </Grid>
  )
}

export default BooklistMui;
