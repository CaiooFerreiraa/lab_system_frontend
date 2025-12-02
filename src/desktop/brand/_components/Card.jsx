import { useNavigate } from "react-router-dom";

export default function Card({ elements = [], search = "", onRefresh }) {
  const filteredItens = elements.filter((model) => 
    model.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {filteredItens.map((element, index) => (
        <InfoCard data={element} key={index} onRefresh={onRefresh} />
      ))}
    </div>
  )
}

function InfoCard({data, onRefresh}) {
  const host = import.meta.env.VITE_API_URL
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!confirm("Deseja excluir esse produto?")) return;

    const setor = data.nome;

    fetch(`${host}/model/delete?nome=${setor}`, {
      method: "DELETE",
    })
      .then(() => onRefresh())
      .catch((err) => console.error("Houve um erro: " + err));
  };

  const handleEdit = () => {
    const uuid = data.nome;
    navigate(`/model/edit/${uuid}`);
  };


  return (
    <div className="cardMark-desktop">
      {Object.entries(data).map(([key, value]) => {
        return (
          <div className={`infos`} key={key}>
            <span className="value">{key}</span>
            <span className={`setor value`}>{value[0].toUpperCase() + value.slice(1)}</span>
          </div>
        );
      })}
      <div className="functionButtons-desktop">
        <button className="material-symbols-outlined action-desktop" onClick={(ev) => handleDelete(ev)}>delete</button>
        <button className="material-symbols-outlined action-desktop" onClick={(ev) => handleEdit(ev)}>edit</button>
      </div>
    </div>
  )
}
