import { createContext, useState, useCallback } from 'react';
//import axios from 'axios';

const UserReservationContext = createContext();

function Provider({ children }) {
     const [reservations, setReservations] = useState([]);

    const fetchAllReservations = useCallback(async () => {
    const response = await fetch('http://localhost:3001/reservation',
    {
      method:'GET'
    });
    const data = await response.json();
      setReservations(data) 
  }, []);

  const editUserReservationById = async (id, newFormData) => {
    const response = await fetch(`http://localhost:3001/reservation/${id}`, {
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body : JSON.stringify(newFormData)
    });
    
    const data1 = await response.json();

    const updatedRecords = reservations.map((item) => {
      if (item.id === id) {
        return {...data1 };
      }

      return item;
    });
    setReservations(updatedRecords);
  };

  const deleteReservationById = async (id) => {
    const res = await fetch(`http://localhost:3001/reservation/${id}`,{
      method:'DELETE'
    });

    const updatedRecords = await res.json();

    setReservations(updatedRecords);
  };

  const createReservation = async (formData) => {
    const response = await fetch('http://localhost:3001/reservation', {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(formData),
    });

      const data = await response.json();
    const updatedRecords = [...reservations, data];
    setReservations(updatedRecords);
  };


  


  const valueToShare = {
  	reservations,
  	deleteReservationById,
  	editUserReservationById,
  	createReservation,
  	fetchAllReservations,
  }

    return <UserReservationContext.Provider value={valueToShare}>
        { children }
    </UserReservationContext.Provider>
}

export { Provider };
export default UserReservationContext;
