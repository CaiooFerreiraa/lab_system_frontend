import './index.css';
import './css/Form.css'
import './css/Header.css'
import './css/InfoCards.css'
import './css/Load.css'
import './css/PopUp.css'
import { Routes, Route } from "react-router-dom";
import HomeEmployee from './mobile/employee/Home';
import RegisterEmployee from './mobile/employee/Register';
import EditEmployee from './mobile/employee/Edit';
import HomeApp from './HomeApp';
import HomeMark from './mobile/mark/Home'
import RegisterMark from './mobile/mark/Register'
import EditMark from './mobile/mark/Edit'
import HomeDesktop from './desktop/home'
import isDesktop from './hook/isDesktop'

function App() {
  const desktop = isDesktop()

  return (
    <Routes>
      <Route path='/' element={desktop ? <HomeDesktop /> : <HomeApp />}/>
      {/* Joscielle */}
      <Route path="/employee" element={desktop ? <HomeDesktop page={"employee"}/> :<HomeEmployee />} />
      {/* Douglas */}
      <Route path='/employee/register' element={desktop ? <HomeDesktop page={"employee-register"}/> : <RegisterEmployee />}/>
      {/* Kauan */}
      <Route path='/employee/register/:registration' element={desktop ? <HomeDesktop page={"employee-register"}/> :<RegisterEmployee />}/>
      {/* Erick */}
      <Route path='/employee/edit/:registration' element={desktop ? <HomeDesktop page={"employee-edit"}/> :<EditEmployee />}/>
      {/* Caio */}
      <Route path='/mark' element={desktop ? <HomeDesktop page={"mark"}/> :<HomeMark />}/>
      <Route path='/mark/register' element={desktop ? <HomeDesktop page={"mark-register"}/> :<RegisterMark />}/>
      <Route path='/mark/edit/:mark' element={desktop ? <HomeDesktop page={"mark-edit"}/> :<EditMark />}/>
    </Routes>
  )
}

export default App
