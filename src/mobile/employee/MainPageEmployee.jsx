import InfosCards from "./_components/InfosCards.jsx";
import { useEffect, useState } from "react"

const hostDeployment = 'http://192.168.1.2:5000'

export default function MainPageEmployee() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch(`${hostDeployment}/employee/view`)
    .then(response => response.json())
    .then(dataEmployees => setEmployees(dataEmployees))
    .catch(err => console.error("Houve um error: ", err))
  }, [])

  return (
    <>
      <div id="cardMain">
        <InfosCards infosElement={employees}/>
      </div>
    </>
  )
}