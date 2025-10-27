import InfoCard from './InfoCard';
import { Link } from "react-router-dom"

export default function MainCardMark({dataMarks, fetchMarkFromApi, search}) {
  return (
    <>
      <div id='registerEmployee'>
        <Link to='/mark/register' className="link">Cadastrar Marca</Link>
      </div>
      <InfoCard marks={dataMarks} onRefresh={fetchMarkFromApi} search={search}/>
    </>
  )
}