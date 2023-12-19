import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul className='menu'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Registration Form</Link>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default App;
