import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route index element={<HomeScreen />} />
      
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
