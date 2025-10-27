import InfosCards from "./InfosCards.jsx";
import { Link } from "react-router-dom";

export default function MainPageEmployee({employees = [], onRefresh, search}) {
  return (
    <>
      <div id="cardMain">
        <div id='registerEmployee'>
          <Link to='/employee/register' className="link">Cadastrar Funcionário</Link>
        </div>
        <InfosCards employees={employees} onRefresh={onRefresh} search={search}/>
      </div>
    </>
  )
}