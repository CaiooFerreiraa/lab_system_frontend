import { useState, useEffect } from "react";
import Load from "./_components/Load";
import Card from "./_components/Card";
import PopUp from "./_components/PopUp";

export default function Model({ search }) {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const host = import.meta.env.VITE_API_URL;

  const [msg, setMsg] = useState("");
  const [popUp, setPopUp] = useState(false);

  const fetchModels = () => {
    setLoading(true);
    fetch(`${host}/model/read`)
      .then((response) => response.json())
      .then((data) => {
        setModels(data.modelos)
      })
      .catch((err) => console.error("Erro ao carregar modelos:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <>
      {loading && <Load />}
      {popUp && <PopUp msg={msg} setPopUp={setPopUp}/>}
      <div className="main-card">
        <Card 
          elements={models} 
          search={search} 
          onRefresh={fetchModels} 
          setMsg={setMsg} 
          setPopUp={setPopUp} 
          setLoading={setLoading}/>
      </div>
    </>
  );
}
