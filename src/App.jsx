import Header from "./mobile/employee/Header.jsx"
import MainCard from "./mobile/employee/MainPageEmployee.jsx"
import './index.css';

function App() {
  const info = {
    tittle: "Funcionários"  
  }

  return (
    <>
      <div className='main'>
        <Header infos={info}/>
        <MainCard />
      </div>
    </>
  )
}

export default App
