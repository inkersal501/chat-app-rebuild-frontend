import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Join from '@pages/Join';
import Auth from '@pages/Auth';
import Chat from '@pages/Chat';

function App() { 

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Auth />} />
        <Route path={"/chat"} element={<Chat />} />
        <Route path={"/join"} element={<Join />} />
      </Routes>  
    </BrowserRouter>
  )
}

export default App
