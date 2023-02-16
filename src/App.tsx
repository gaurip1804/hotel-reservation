import { useEffect, useContext } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import UserReservationContext from './context/reservations';

function App() {
  const { fetchAllReservations } =  useContext(UserReservationContext);

  useEffect(() => {
    fetchAllReservations();
  }, [fetchAllReservations]);

  return (
    
    <div className="App">
     <HomeScreen />
    </div>
    
  );
}

export default App;
