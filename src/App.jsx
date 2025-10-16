import HomePage from "./mobile/employee/HomePage.jsx"
import MainCard from "./mobile/employee/MainCardEmployee.jsx"

//const hostProduction = 'https://lab-system-backend.onrender.com/employee/register';
//const hostDeployment = 'http://localhost:5000'

function App() {
  const info = {
    tittle: "Funcionário"  
  }

  return (
    <>
      <div className='main'>
        <HomePage infos={info}/>
        <MainCard />
      </div>
    </>
  )
}

export default App
