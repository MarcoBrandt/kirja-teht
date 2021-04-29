import './App.css';
import GetBooks from './components/getBooks';
import AddBook from './components/addBook';


function App() {

  const deleteBook = (id) => {
    console.log('Book deleted!', id);
}



  return (
    <div className="App">
      <GetBooks />
      <AddBook onDelete = {deleteBook} />
    </div>
  );
}

export default App;
