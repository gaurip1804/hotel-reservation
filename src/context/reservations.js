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

    const updatedRecords = reservations.map((item) => {
      if (item.id === id) {
        return { ...item, ...response.data };
      }

      return item;
    });

    setReservations(updatedRecords);
  };

  const deleteReservationById = async (id) => {
    await axios.delete(`http://localhost:3001/reservation/${id}`);

    const updatedRecords = reservations.filter((item) => {
      return item.id !== id;
    });

    setReservations(updatedRecords);
  };

  const createReservation = async (formData) => {
    const response = await axios.post('http://localhost:3001/reservation', {
      ...formData,
    });

    const updatedRecords = [...reservations, response.data];
    setReservations(updatedRecords);
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
