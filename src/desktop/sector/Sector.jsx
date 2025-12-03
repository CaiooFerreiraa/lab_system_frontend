import { useState, useEffect } from "react";
import Card from "./_components/Card";
import Load from "./_components/Load";

export default function Sector({search}) {
  const [sector, setSector] = useState([]);
  const host = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const fetchFromApi = () => {
    setLoading(true)
    fetch(`${host}/sector/read`)
      .then((response) => response.json())
      .then((data) => {
        setSector(data.setores || [])
      })
      .catch((err) => console.error("Houve um error: ", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFromApi();
  }, []);
  

  return (
    <>
      {loading && <Load />}
      <div className="main-card">
        <Card elements={sector} search={search} onRefresh={fetchFromApi}/>
      </div>
    </>
  )
}