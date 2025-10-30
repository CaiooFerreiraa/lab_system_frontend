import { useState, useEffect } from "react";
import Card from "./_components/Card";
import Load from "./_components/Load";
import PopUp from "./_components/PopUp";

export default function Employee({search}) {
  const [employees, setEmployees] = useState([]);
  const host = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchEmployeeFromApi = () => {
    setLoading(true)

    fetch(`${host}/employee/view`)
      .then((response) => response.json())
      .then((dataEmployees) => {
        setEmployees(dataEmployees)
      })
      .catch((err) => console.error("Houve um error: ", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEmployeeFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <>
      {loading && <Load />}
      {popUp && <PopUp msg={msg} setPopUp={setPopUp}/>}
      <div className="main-card">
        <Card employees={employees} search={search} onRefresh={fetchEmployeeFromApi} setPopUp={setPopUp} setMsg={setMsg} setLoading={setLoading}/>
      </div>
    </>
  )
}
