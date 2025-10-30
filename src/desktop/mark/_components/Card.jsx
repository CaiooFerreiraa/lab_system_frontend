import { useNavigate } from "react-router-dom";

export default function Card({ marks = [], search = "", onRefresh, setPopUp, setMsg }) {
  const filteredMarks = marks.filter((mark) =>
    mark.marca.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {filteredMarks.map((element, index) => (
        <InfoCard data={element} key={index} onRefresh={onRefresh} setPopUp={setPopUp} setMsg={setMsg}/>
      ))}
    </div>
  )
}

function InfoCard({data, onRefresh, setPopUp, setMsg}) {
  const host = import.meta.env.VITE_API_URL
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!confirm("Deseja excluir essa marca?")) return
    fetch(`${host}/mark/delete/${data.marca}`, {method: "DELETE"})
      .then(() => {
        setMsg("Marca excluído com sucesso");
        setPopUp(true);
        onRefresh();
      })
      .catch(err => console.error("Houve um erro: " + err))
  }

  const handleEdit = () => {
    navigate(`/mark/edit/${data.marca}`);
  };

  return (
    <div className="cardMark-desktop">
      {Object.entries(data).map(([key, value]) => {
        if (Array.isArray(value)) {
        return (
          <div className={key} key={key}>
              <span className='keyMetodo'>Metodos</span>
              <span className='value'>
              {value.map((met, i) => {
                if (met.nome == null) return
                return (
                  <div key={i}>
                    <strong>{met.nome}</strong>: {met.descricao}
                  </div>
                )
              })}
              </span>
            </div>
          );
        }

        return (
          <div className={key} key={key}>
            <span className="nameMark">{value[0]}</span>
            <span className='value'>{value}</span>
          </div>
        );
      })}
      <div className="functionButtons-desktop">
        <button className="material-symbols-outlined action-desktop" onClick={handleDelete}>delete</button>
        <button className="material-symbols-outlined action-desktop" onClick={handleEdit}>edit</button>
      </div>
    </div>
  )
}
