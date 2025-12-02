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

import HomeProduct from './mobile/product/Home';
import RegisterProduct from './mobile/product/Register';
import EditProduct from './mobile/product/Edit';

import HomeDesktop from './desktop/Home'

import isDesktop from './hook/isDesktop'



function App() {
  const desktop = isDesktop()

  return (
    <Routes>
      <Route path='/' element={desktop ? <HomeDesktop /> : <HomeApp />}/>
      <Route path="/employee" element={desktop ? <HomeDesktop page={"employee"}/> :<HomeEmployee />} />
      <Route path='/employee/register' element={desktop ? <HomeDesktop page={"employee-register"}/> : <RegisterEmployee />}/>
      <Route path='/employee/register/:registration' element={desktop ? <HomeDesktop page={"employee-register"}/> :<RegisterEmployee />}/>
      <Route path='/employee/edit/:registration' element={desktop ? <HomeDesktop page={"employee-edit"}/> :<EditEmployee />}/>

      <Route path='/mark' element={desktop ? <HomeDesktop page={"mark"}/> :<HomeMark />}/>
      <Route path='/mark/register' element={desktop ? <HomeDesktop page={"mark-register"}/> :<RegisterMark />}/>
      <Route path='/mark/edit/:mark' element={desktop ? <HomeDesktop page={"mark-edit"}/> :<EditMark />}/>

      <Route path='/product' element={desktop ? <HomeDesktop page={"product"}/> : <HomeProduct />} />
      <Route path='/product/register' element={desktop ? <HomeDesktop page={"product-register"}/> : <RegisterProduct />} />
      <Route path='/product/edit/:uuid' element={desktop ? <HomeDesktop page={"product-edit"}/> :<EditProduct />}/>

      <Route path='/sector' element={desktop ? <HomeDesktop page={"sector"}/> : <HomeProduct />} />
      <Route path='/sector/register' element={desktop ? <HomeDesktop page={"sector-register"}/> : <RegisterProduct />} />
      <Route path='/sector/edit/:uuid' element={desktop ? <HomeDesktop page={"sector-edit"}/> :<EditProduct />}/>

      <Route path='/model' element={desktop ? <HomeDesktop page={"model"}/> : <HomeProduct />} />
      <Route path='/model/register' element={desktop ? <HomeDesktop page={"model-register"}/> : <RegisterProduct />} />
      <Route path='/model/edit/:uuid' element={desktop ? <HomeDesktop page={"model-edit"}/> :<EditProduct />}/>
    </Routes>
  )
}

export default App
