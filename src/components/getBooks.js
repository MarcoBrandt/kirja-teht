import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Button from '@material-ui/core/Button';

function GetBooks() {
  const[books, setBook] = useState([]);
  const[bookerror, setError] = useState('Fetching');
  const[currentBook, setCurrentBook] = useState(books);

  const getAllBooks = async () => {
    try {
      const response = await fetch('http://localhost:8080/kirja/all');
      const json = await response.json();
      setBook(json);
      console.log(json);
      setError('');
    } catch {
      setBook([]);
      setError('Fetching book information failed');
    }
  }
  
  const deleteRow = (id, e) => {  
    axios.delete(`http://localhost:8080/kirja/delete/${id}`)  
      .then(res => {  
        console.log(res);  
        console.log(res.data);
        setBook(books.filter((book) => book.id!== id))
      })
  }

  const editBook = (e, id) => {
    const kirjaid = id;
    try {
      const response = fetch(`http://localhost:8080/kirja/${kirjaid}`);
      const json = response.json();
      setError(json);
      
    } catch {
      setError('poop');
    }
  }

  useEffect(() =>{
    getAllBooks();
  }, [])

  if (bookerror.length > 0) {
    return ( <Typography>{ bookerror }</Typography> );
  }

  if (books.length > 0) {
    return ( 
        <div>
      { 
        books.map(book => {
          return (
             <p key={book.id}  >
                  Title: { book.title.toUpperCase() }<br />
                  Author: { book.author }<br />
                  Description: { book.description }<br />
                  <Button variant='contained' onClick={(e) => editBook(book.id, e)}color='primary'>Edit</Button>
                  <Button variant='contained' onClick={(e) => deleteRow(book.id, e)} color='secondary'>Delete</Button>
             </p>
          )
        })
     }
     </div>
    
    );
  }
  return ( <Typography>There are no books?</Typography> );
}

export default GetBooks;