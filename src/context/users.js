import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const BooksContext = createContext();

function Provider({ children }) {
     const [books, setBooks] = useState([]);
     const [userDet, setUserDetails] = useState([]);

    const fetchBooks = useCallback(async () => {
    const response = await axios.get('http://localhost:3001/reservation');
      setBooks(response.data);
  }, []);

  const editUserReservationById = async (id, newFormData) => {
    const response = await axios.put(`http://localhost:3001/reservation/${id}`, {
      ...newFormData,
    });

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }

      return book;
    });

    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const createBook = async (title) => {
    const response = await axios.post('http://localhost:3001/books', {
      title,
    });

    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };


  const searchBookById = useCallback(async (id) => {
    const response = await axios.get(`http://localhost:3001/reservation`);

     response.data.map((item) => {
      if (item.id === id) {
        setUserDetails(item);
      }
      return item;
    });
    
  },[]);


  const valueToShare = {
  	books,
    userDet,
  	deleteBookById,
  	editUserReservationById,
  	createBook,
  	fetchBooks,
    searchBookById,
  }

    return <BooksContext.Provider value={valueToShare}>
        { children }
    </BooksContext.Provider>
}

export { Provider };
export default BooksContext;
