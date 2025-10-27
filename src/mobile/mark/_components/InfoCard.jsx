import { useNavigate } from "react-router-dom"

export default function InfoCard({ marks = [], search = "", onRefresh }) {
  const filteredMarks = marks.filter(mark =>
    mark.marca.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {filteredMarks.map((element, index) => (
        <Card data={element} key={index} onRefresh={onRefresh} />
      ))}
    </>
  );
}


function Card({ data, onRefresh }) {
  const host = import.meta.env.VITE_API_URL
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!confirm("Deseja excluir essa marca?")) return
    fetch(`${host}/mark/delete/${data.marca}`, {method: "DELETE"})
      .then(() => onRefresh())
      .catch(err => console.error("Houve um erro: " + err))
  }

  const handleEdit = () => {
    navigate(`/mark/edit/${data.marca}`);
  };

  return (
    <div className="cardMark">
      {Object.entries(data).map(([key, value]) => {
        if (Array.isArray(value)) {
        return (
          <div className={key} key={key}>
              <span className='keyMetodo'>Metodos:</span>
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
      <div className="buttonsMark">
        <button className="material-symbols-outlined" onClick={handleDelete}>delete</button>
        <button className="material-symbols-outlined" onClick={handleEdit}>edit</button>
      </div>
    </div>
  );
}
