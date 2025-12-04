import '../../css/ModelInfo.css'
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Load from "./_components/Load";

export default function ModelInfo() {
  const { nome } = useParams();
  const navigate = useNavigate();
  const host = import.meta.env.VITE_API_URL;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${host}/model/search/${encodeURIComponent(nome)}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.modelo);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = () => {
    if (!confirm("Deseja excluir esse produto?")) return;

    fetch(`${host}/model/delete?nome=${encodeURIComponent(data.nome)}`, {
      method: "DELETE",
    })
      .then(() => navigate(-1))
      .catch((err) => console.error("Houve um erro: " + err))

  };

  if (loading) return <Load />;
  if (!data) return <h2>Modelo não encontrado</h2>;

  return (
    <main className="model-info-container">

      <div className="top-actions">
        <Link to="/model" className="material-symbols-outlined arrow-back">
          arrow_back
        </Link>

        <button 
          className="material-symbols-outlined edit-btn"
          onClick={() => navigate(`/model/edit/${data.nome}`)}
        >
          edit
        </button>
        <button 
          className="material-symbols-outlined edit-btn"
          onClick={() => handleDelete()}
        >
          delete
        </button>
      </div>

      <h1>{data.nome}</h1>

      <div className="info-block">
        <p><b>Tipo:</b> {data.tipo}</p>
        <p><b>Marca:</b> {data.marca}</p>
      </div>

      <h2>Especificações</h2>

      <div className="speci-list">
        {data.especificacoes.map((esp, i) => (
          <div key={i} className="spec-item">
            <p><b>Teste:</b> {esp.tipo}</p>
            <p><b>Valor:</b> {esp.valor} ± {esp.variacao}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
