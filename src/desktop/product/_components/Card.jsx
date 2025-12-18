import { useNavigate } from "react-router-dom";

export default function Card({ elemets = [], search = "", onRefresh }) {
  const filteredMarks = elemets.filter((product) => 
    product.referencia.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {filteredMarks.map((element, index) => (
        <InfoCard data={element} key={index} onRefresh={onRefresh} />
      ))}
    </div>
  )
}

function InfoCard({data, onRefresh}) {
  const host = import.meta.env.VITE_API_URL
  const navigate = useNavigate();

  const handleDelete = (e) => {
    if (!confirm("Deseja excluir essa marca?")) return
    const uuid = e.target.parentNode.parentNode.querySelector('.referencia').innerHTML
    const setor = e.target.parentNode.parentNode.querySelector('.setor').innerHTML

    fetch(`${host}/product/delete?uuid=${uuid}&setor=${setor}`, {method: "DELETE"})
      .then(() => onRefresh())
      .catch(err => console.error("Houve um erro: " + err))
  }

  const handleEdit = (e) => {
    const uuid = e.target.parentNode.parentNode.querySelector('.referencia').innerHTML
    navigate(`/product/edit/${uuid}`);
  };

  return (
    <div className="cardMark-desktop">
      {Object.entries(data).map(([key, value]) => {
        return (
          <div className={`infos`} key={key}>
            <span className="value">{key[0].toUpperCase() + key.slice(1)}</span>
            <span className={`${key} value`}>{value[0].toUpperCase() + value.slice(1)}</span>
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
