import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    <div className='min-h-screen App bg-slate-900'>
      <Route path='/' component={HomePage} exact></Route>
      <Route path='/chats' component={ChatPage}></Route>
    </div>
  );
}

export default App;
