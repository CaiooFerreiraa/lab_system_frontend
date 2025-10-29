import './index.css';
import './css/Form.css'
import './css/Header.css'
import './css/InfoCards.css'
import './css/Load.css'
import './css/PopUp.css'
import './css/reset.css'
import { Routes, Route } from "react-router-dom";
import HomeEmployee from './mobile/employee/Home';
import RegisterEmployee from './mobile/employee/Register';
import EditEmployee from './mobile/employee/Edit';
import HomeApp from './HomeApp';
import HomeMark from './mobile/mark/Home'
import RegisterMark from './mobile/mark/Register'
import EditMark from './mobile/mark/Edit'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeApp />}/>
      {/* Joscielle */}
      <Route path="/employee" element={<HomeEmployee />} />
      {/* Douglas */}
      <Route path='/employee/register' element={<RegisterEmployee />}/>
      {/* Kauan */}
      <Route path='/employee/register/:registration' element={<RegisterEmployee />}/>
      {/* Erick */}
      <Route path='/employee/edit/:registration' element={<EditEmployee />}/>
      {/* Caio */}
      <Route path='/mark' element={<HomeMark />}/>
      <Route path='/mark/register' element={<RegisterMark />}/>
      <Route path='/mark/edit/:mark' element={<EditMark />}/>
    </Routes>
  )
}

export default App
