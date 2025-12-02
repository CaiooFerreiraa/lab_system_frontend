import { useState, useEffect } from "react";
import CardModel from "./_components/CardModel";
import Load from "./_components/Load";

export default function Model({ search }) {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const host = import.meta.env.VITE_API_URL;

  const fetchModels = () => {
    setLoading(true);
    fetch(`${host}/model/view`)
      .then((response) => response.json())
      .then((data) => setModels(data))
      .catch((err) => console.error("Erro ao carregar modelos:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <>
      {loading && <Load />}
      <div className="main-card">
        <CardModel models={models} search={search} onRefresh={fetchModels} />
      </div>
    </>
  );
}
