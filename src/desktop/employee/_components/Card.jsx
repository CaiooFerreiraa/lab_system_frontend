import { useNavigate } from "react-router-dom";

export default function Card({ employees = [], search = "", onRefresh, setPopUp, setMsg, setLoading }) {
  const filteredEmployees = employees.filter((employee) =>
    employee?.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {filteredEmployees.map((element, index) => (
        <InfoCard 
          data={element} 
          key={index}
          onRefresh={onRefresh} 
          setPopUp={setPopUp} 
          setMsg={setMsg} 
          setLoading={setLoading}/>
      ))}
    </div>
  )
}

function InfoCard({data, onRefresh, setPopUp, setMsg, setLoading}) {
  const hostDeployment = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleEdit = (ev) => {
    const card = ev.target.closest(".cardDesktop");
    const registration = card.querySelector(".matricula .value").innerHTML;
    navigate(`/employee/edit/${registration}`);
  };

  const handleDelete = (ev) => {
    const card = ev.target.closest(".cardDesktop");
    const registration = card.querySelector(".matricula .value").innerHTML;

    if (!confirm("Deseja apagar esse funcionário?")) return;

    setLoading(true)

    fetch(`${hostDeployment}/employee/delete/${registration}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setMsg("Funcionário excuído com sucesso");
          setPopUp(true)
          setLoading(false)
          onRefresh()
        };
      })
      .catch((err) => console.error("Houve um erro: " + err))
      .finally(() => setLoading(false));
  };

  return (
    <article className="cardDesktop">
      <div className="card-content-desktop">
        {Object.entries(data).map(([key, value]) => (
          <InfoField key={key} name={key} value={value} />
        ))}
      </div>

      <div className="functionButtons-desktop">
        <button
          className="material-symbols-outlined action-desktop"
          onClick={handleDelete}
          type="button"
        >
          delete
        </button>
        <button
          className="action-desktop material-symbols-outlined"
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
  const baseClass = `infos-desktop ${name}`;

  if (isName) {
    return (
      <div className={baseClass}>
        <span className="nome-desktop">
          <span className="imgName-desktop">{value?.[0]}</span>
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
