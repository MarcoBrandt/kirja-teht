import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';

function GetBooks() {
  const[books, setBook] = useState([]);
  const[bookerror, setError] = useState('Fetching');

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
             <p key={book.id}>
                  Title: { book.title.toUpperCase() }<br />
                  Author: { book.author }<br />
                  Description: { book.description }<br />
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