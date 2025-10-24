import InfosCards from "./InfosCards.jsx";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function MainPageEmployee() {
  const [employees, setEmployees] = useState([]);
  const hostDeployment = import.meta.env.VITE_API_URL;

  const fetchEmployeeFromApi = () => {
    fetch(`${hostDeployment}/employee/view`)
      .then(response => response.json())
      .then(dataEmployees => setEmployees(dataEmployees))
      .catch(err => console.error("Houve um error: ", err))
  }

  useEffect(() => {
    fetchEmployeeFromApi()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div id="cardMain">
        <div id='registerEmployee'>
          <Link to='/employee/register' className="link">Cadastrar Funcionário</Link>
        </div>
        <InfosCards infosElement={employees} onRefresh={fetchEmployeeFromApi}/>
      </div>
    </>
  )
}