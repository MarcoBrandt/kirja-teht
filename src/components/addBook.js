import axios from 'axios';
import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function AddBook () {
    const [book, setValues] = useState( {title: '', author: '', description: ''} );
    const [bookerror, setError] = useState('');

    const addSingleBook = (e) => {
        e.preventDefault();
        const formData = {
            'title': book.title, 'author': book.author, 'description': book.description
        }

    axios.post('http://localhost:8080/kirja/add', formData)
        .then(response => {
            if (response.status === 200) {
                setValues( {title: '', author: '', description: ''});
                setError('Book added!')
            } else {
                setError('Adding book failed...')
            }
        }) 
    }

    const clearform = (e) => {
        e.preventDefault();
        setValues( {title: '', author: '', description: ''} );
        setError('Form cleared!')
    }

    const change = (e) => {
        setValues({
          ...book,
          [e.target.name]: e.target.value
        });
      };

      return (
        <Paper style={ {padding:'10px', margin:'30px'} }>
        <form>

          <TextField label='Title' name='title' value={ book.title }
          onChange={ change } margin='normal' required fullWidth />
          <TextField label='Author' name='author' value={ book.author }
          onChange={ change } margin='normal' required fullWidth />
          <TextField label='Description' name='description' value={ book.description }
          onChange={ change } margin='normal' multiline rows='4' fullWidth />
    
          <div style={ {textAlign: 'center'} }>
            <Button onClick={addSingleBook} variant='contained' color='primary' style={ {marginRight:20} }> Save new </Button>
            <Button onClick={clearform} variant='contained' color='secondary'> Clear </Button>
          </div>
        </form>
        <Typography style={ {marginTop: 20} }>{ bookerror }</Typography>
        </Paper>
      );
    
}

export default AddBook;