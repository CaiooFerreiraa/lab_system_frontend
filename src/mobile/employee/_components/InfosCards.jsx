import { useNavigate } from "react-router-dom";
import Load from "./Load";

export default function InfosCard({ employees = [], search = "", onRefresh }) {
  const filteredEmployees = employees.filter((employee) =>
    employee.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="infos-section">
      <div className="infos-wrapper">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((element, index) => (
            <InfoCard data={element} key={index} onRefresh={onRefresh} />
          ))
        ) : (
          <p className="no-results">Nenhum funcionário encontrado.</p>
        )}
      </div>
    </section>
  );
}

function InfoCard({ data, onRefresh }) {
  const hostDeployment = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleEdit = (ev) => {
    const card = ev.target.closest(".card");
    const registration = card.querySelector(".matricula .value").innerHTML;
    navigate(`/employee/edit/${registration}`);
  };

  const handleDelete = (ev) => {
    const card = ev.target.closest(".card");
    const registration = card.querySelector(".matricula .value").innerHTML;

    if (!confirm("Deseja apagar esse funcionário?")) return;

    fetch(`${hostDeployment}/employee/delete/${registration}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) onRefresh();
      })
      .catch((err) => console.error("Houve um erro: " + err));
  };

  return (
    <article className="card">
      <div className="card-content">
        {Object.entries(data).map(([key, value]) => (
          <InfoField key={key} name={key} value={value} />
        ))}
      </div>

      <div className="functionButtons">
        <button
          className="material-symbols-outlined"
          onClick={handleDelete}
          type="button"
        >
          delete
        </button>
        <button
          className="material-symbols-outlined"
          onClick={handleEdit}
          type="button"
        >
          edit
        </button>
      </div>
    </article>
  );
}

function InfoField({ name, value }) {
  const isName = name === "nome";
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
