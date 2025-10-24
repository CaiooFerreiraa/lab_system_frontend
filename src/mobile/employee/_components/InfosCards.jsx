import { useNavigate } from "react-router-dom";

export default function InfosCards({ infosElement = [], onRefresh }) {
  return (
    <>
      {infosElement.map((element, index) => (
        <InfoCard key={index} data={element} onRefresh={onRefresh}/>
      ))}
    </>
  );
}

function InfoCard({ data, onRefresh }) {
  const hostDeployment = import.meta.env.VITE_API_DEVELOPMENT; 
  const navigate = useNavigate();

  const handleEdit = (ev) => {

    const card = ev.target.parentNode.parentNode
    const registration = card.querySelector('.matricula').querySelector('.value').innerHTML
  
    navigate(`/employee/edit/${registration}`);
  }

  const handleDelete = (ev) => {
    const card = ev.target.parentNode.parentNode
    const registration = card.querySelector('.matricula').querySelector('.value').innerHTML
  
    fetch(`${hostDeployment}/employee/delete/${registration}`, {method: "post"})
      .then(response => {
        if (response.ok) {
          onRefresh()
        }
      })
      .catch(err => console.error("Houve um error: " + err));
  }

  return (
    <div className="card">
      {Object.entries(data).map(([key, value]) => (
        <InfoField key={key} name={key} value={value} />
      ))}

      <div className="functionButtons">
        <button className="material-symbols-outlined" onClick={handleDelete}>delete</button>
        <button className="material-symbols-outlined" onClick={handleEdit}>edit</button>
      </div>
    </div>
  );
}

function InfoField({ name, value }) {
  const isName = name === 'nome';
  const baseClass = `infos ${name}`;

  if (isName) {
    return (
      <div className={baseClass}>
        <span className="nome">
          <span className="imgName">{value?.[0]}</span>
          <span>{value}</span>
        </span>
      </div>
    );
  }

  return (
    <div className={baseClass}>
      <span className="label">{name}:</span>
      <span className="value">{value}</span>
    </div>
  );
}
