import '../../../css/InfoCards.css';

export default function InfosCards({ infosElement = [] }) {
  return (
    <>
      {infosElement.map((element, index) => (
        <InfoCard key={index} data={element} />
      ))}
    </>
  );
}

function InfoCard({ data }) {
  return (
    <div className="card">
      {Object.entries(data).map(([key, value]) => (
        <InfoField key={key} name={key} value={value} />
      ))}

      <div className="functionButtons">
        <button className="material-symbols-outlined">delete</button>
        <button className="material-symbols-outlined">edit</button>
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
