import { useNavigate } from "react-router-dom";

export default function Card({ elements = [], search = "", onRefresh, setMsg, setPopUp, setLoading }) {
  const filteredItens = elements.filter((model) => {
    return model?.nome.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      {filteredItens.map((element, index) => (
        <InfoCard 
          data={element} 
          key={index} 
          onRefresh={onRefresh} 
          setMsg={setMsg} 
          setPopUp={setPopUp} 
          setLoading={setLoading}/>
      ))}
    </div>
  );
}

function InfoCard({ data, onRefresh, setMsg, setPopUp, setLoading }) {
  const host = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!confirm("Deseja excluir esse produto?")) return;

    setLoading(true)
    fetch(`${host}/model/delete?nome=${encodeURIComponent(data.nome)}`, {
      method: "DELETE",
    })
      .then(() => {
        setMsg("Modelo deletado com sucesso!")
        setPopUp(true)
        onRefresh();
      })
      .catch((err) => console.error("Houve um erro: " + err))
      .finally(() => setLoading(false));
  };

  const handleOpen = () => navigate(`/model/view/${data.nome}`);

  return (
    <div
      className="cardMark-desktop"
      style={{ cursor: "pointer" }}
    >
      <div className="infos">
        <span className="value">Modelo</span>
        <span className="value">{data?.nome || "—"}</span>
      </div>

      <div className="infos">
        <span className="value">Tipo</span>
        <span className="value">{data?.tipo || "—"}</span>
      </div>

      <div className="infos">
        <span className="value">Marca</span>
        <span className="value">{data?.marca || "—"}</span>
      </div>

      <div className="functionButtons-desktop">
        <button
          className="material-symbols-outlined action-desktop"
          onClick={handleOpen}
        >
          eye_tracking
        </button>

        <button
          className="material-symbols-outlined action-desktop"
          onClick={(ev) => {
            ev.stopPropagation();
            handleDelete();
          }}
        >
          delete
        </button>

        <button
          className="material-symbols-outlined action-desktop"
          onClick={(ev) => {
            ev.stopPropagation();
            navigate(`/model/edit/${data.nome}`);
          }}
        >
          edit
        </button>
      </div>
    </div>
  );
}
