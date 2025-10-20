import InfosCards from "./_components/InfosCards.jsx";
import { useEffect, useState } from "react"

export default function MainPageEmployee() {
  const [employees, setEmployees] = useState([]);
  const hostDeployment = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${hostDeployment}/employee/view`)
    .then(response => response.json())
    .then(dataEmployees => setEmployees(dataEmployees))
    .catch(err => console.error("Houve um error: ", err))
  }, [hostDeployment])

  return (
    <>
      <div id="cardMain">
        <InfosCards infosElement={employees}/>
      </div>
    </>
  )
}