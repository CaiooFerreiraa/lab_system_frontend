import '../../css/Header.css';

export default function HomePage({ infos }) {
  const tittle = infos?.tittle;

  return (
    <>
      <div id="headerBar">
        <h1>{tittle}</h1>
        <div id='buttons'>
          <span className="material-symbols-outlined">search</span>
          <span className="material-symbols-outlined">more_vert</span>
        </div>
      </div>
    </>
  )
}