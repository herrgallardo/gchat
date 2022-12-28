import './App.css';
import { Route } from 'react-router-dom';
import Home from './Pages/Home.js';
import Chat from './Pages/Chat';

function App() {
  return (
    <div className='App'>
      <Route path='/' component={Home} exact></Route>
      <Route path='/chats' component={Chat}></Route>
    </div>
  );
}

export default App;
