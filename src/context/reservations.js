import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const UserReservationContext = createContext();

function Provider({ children }) {
     const [reservations, setReservations] = useState([]);
     const [userDet, setUserDetails] = useState([]);

    const fetchAllReservations = useCallback(async () => {
    const response = await axios.get('http://localhost:3001/reservation');
    setReservations(response.data);
  }, []);

  const editUserReservationById = async (id, newFormData) => {
    const response = await axios.put(`http://localhost:3001/reservation/${id}`, {
      ...newFormData,
    });

    const updatedBooks = reservations.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }

      return book;
    });

    setReservations(updatedBooks);
  };

  const deleteReservationById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);

    const updatedBooks = reservations.filter((book) => {
      return book.id !== id;
    });

    setReservations(updatedBooks);
  };

  const createReservation = async (title) => {
    const response = await axios.post('http://localhost:3001/books', {
      title,
    });

    const updatedBooks = [...reservations, response.data];
    setReservations(updatedBooks);
  };


  const searchUserReservationById = async (id) => {
    const response = await axios.get(`http://localhost:3001/reservation`);
     response.data.map((item) => {
      if (item.id === id) {
        setUserDetails(item);
        return item;
      }
      return item;
    });
    
  };


  const valueToShare = {
  	reservations,
    userDet,
  	deleteReservationById,
  	editUserReservationById,
  	createReservation,
  	fetchAllReservations,
    searchUserReservationById,
  }

    return <UserReservationContext.Provider value={valueToShare}>
        { children }
    </UserReservationContext.Provider>
}

export { Provider };
export default UserReservationContext;
