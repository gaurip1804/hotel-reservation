import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from './context/users';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider>
    <App />
  </Provider>
);