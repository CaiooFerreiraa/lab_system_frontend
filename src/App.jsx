import './index.css';
import './css/Form.css'
import './css/Header.css'
import './css/InfoCards.css'
import { Routes, Route } from "react-router-dom";
import Home from './mobile/employee/Home';
import Register from './mobile/employee/Register';
import Edit from './mobile/employee/Edit';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path='/employee/register' element={<Register />}/>
      <Route path='/employee/register/:registration' element={<Register />}/>
      <Route path='/employee/edit/:registration' element={<Edit />}/>
    </Routes>
  )
}

export default App
