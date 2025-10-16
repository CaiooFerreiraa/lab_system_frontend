import { useEffect, useState } from "react"

const hostDeployment = 'http://192.168.1.3:5000'

export default function MainCardEmployee() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch(`${hostDeployment}/employee/view`)
    .then(response => response.json())
    .then(dataEmployees => setEmployees(dataEmployees))
    .catch(err => console.error("Houve um error: ", err))
  }, [])

  return (
    <>
      <div>
        {employees.map((element, index) => (
          <>
            <div key={index}>
              {Object.entries(element).map(([key, value]) => (
                <div key={key}>
                  {key}: {value}
                </div>
              ))}
            </div>
            <hr />
          </>
        ))}
      </div>
    </>
  )
}