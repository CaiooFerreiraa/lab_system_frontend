import { useState, useEffect } from "react";
import Card from "./_components/Card";

export default function Employee({search}) {
  const [employees, setEmployees] = useState([]);
  const host = import.meta.env.VITE_API_URL;

  const fetchEmployeeFromApi = () => {
    fetch(`${host}/employee/view`)
      .then((response) => response.json())
      .then((dataEmployees) => setEmployees(dataEmployees))
      .catch((err) => console.error("Houve um error: ", err));
  };

  useEffect(() => {
    fetchEmployeeFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <>
      <div className="main-card">
        <Card employees={employees} search={search} onRefresh={fetchEmployeeFromApi}/>
      </div>
    </>
  )
}