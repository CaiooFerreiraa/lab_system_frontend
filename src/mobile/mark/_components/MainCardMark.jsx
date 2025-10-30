import InfoCard from './InfoCard';
import { Link } from "react-router-dom"

export default function MainCardMark({dataMarks, fetchMarkFromApi, search}) {
  return (
    <main id="cardMain" className="main-page-employee">
      {/* 🔹 Cabeçalho de ações */}
      <section className="employee-actions">
        <div id="registerEmployee" className="register-employee">
          <Link to="/mark/register" className="link">
            Cadastrar Marca
          </Link>
        </div>
      </section>

      {/* 🔹 Listagem de funcionários */}
      <section className="employee-list">
        <div className="employee-list-container">
          <InfoCard marks={dataMarks} onRefresh={fetchMarkFromApi} search={search} />
        </div>
      </section>
    </main>
  )
}