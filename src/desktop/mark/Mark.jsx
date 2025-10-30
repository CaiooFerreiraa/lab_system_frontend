import { useState, useEffect } from "react";
import Card from "./_components/Card";
import Load from "./_components/Load";
import PopUp from "./_components/PopUp";

export default function Mark({search}) {
  const [marks, setMarks] = useState([]);
  const host = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchMarkFromApi = () => {
    setLoading(true)
    fetch(`${host}/mark/view`)
      .then((response) => response.json())
      .then((datamarks) => {
        setMarks(datamarks)
      })
      .catch((err) => console.error("Houve um error: ", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMarkFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <>
      {loading && <Load />}
      {popUp && <PopUp msg={msg}/>}
      <div className="main-card">
        <Card marks={marks} search={search} onRefresh={fetchMarkFromApi} setPopUp={setPopUp}/>
      </div>
    </>
  )
}
