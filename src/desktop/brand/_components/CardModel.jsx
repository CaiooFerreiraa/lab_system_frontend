import { useNavigate } from "react-router-dom";

export default function CardModel({ models = [], search = "", onRefresh }) {
  const filteredModels = models.filter((model) =>
    model.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {filteredModels.map((m, index) => (
        <InfoCardModel data={m} key={index} onRefresh={onRefresh} />
      ))}
    </div>
  );
}

function InfoCardModel({ data, onRefresh }) {
  const navigate = useNavigate();
  const host = import.meta.env.VITE_API_URL;

  const handleDelete = () => {
    if (!confirm("Deseja excluir esse modelo?")) return;

    fetch(`${host}/model/delete/${data.cod_modelo}`, {
      method: "DELETE",
    })
      .then(() => onRefresh())
      .catch((err) => console.error("Erro ao excluir modelo:", err));
  };

  const handleEdit = () => {
    navigate(`/model/edit/${data.cod_modelo}`);
  };

  return (
    <div className="cardMark-desktop">
      <div className="nome">
        <span className="nameMark">{data.nome}</span>
      </div>

      <div className="value">
        <strong>Tipo:</strong> {data.tipo}
      </div>

      <div className="value">
        <strong>Especificação:</strong> {data.especificacao_modelo}
      </div>

      <div className="value">
        <strong>Marca:</strong> {data.cod_marca}
      </div>

      <div className="functionButtons-desktop">
        <button className="material-symbols-outlined action-desktop" onClick={handleDelete}>
          delete
        </button>
        <button className="material-symbols-outlined action-desktop" onClick={handleEdit}>
          edit
        </button>
      </div>
    </div>
  );
}
