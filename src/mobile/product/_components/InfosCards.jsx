import { useNavigate } from "react-router-dom";

export default function InfosCard({ products = [], search = "", onRefresh }) {
  const filteredProducts = products.filter((product) =>
    product.referencia.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="infos-section">
      <div className="infos-wrapper">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((element, index) => (
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
    navigate(`/pruduct/edit/${registration}`);
  };

  const handleDelete = (ev) => {
    const card = ev.target.closest(".card");
    const registration = card.querySelector(".matricula .value").innerHTML;

    if (!confirm("Deseja apagar esse funcionário?")) return;

    fetch(`${hostDeployment}/product/delete/${registration}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) onRefresh();
      })
      .catch((err) => console.error("Houve um erro: " + err));
  };

  return (
    <article className="card-product">
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
      <span className="label">{name[0].toUpperCase() + name.slice(1)}:</span>
      <span className="value">{value}</span>
    </div>
  );
}
