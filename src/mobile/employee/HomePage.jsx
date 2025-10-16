export default function HomePage({ infos }) {
  const tittle = infos?.tittle;

  return (
    <>
      <div >
        <div className="headerBar">
          <h1>{tittle}</h1>
          <div>
            <button>ButtonSearch</button>
            <button>ButtonBar</button>
          </div>
        </div>
      </div>
    </>
  )
}