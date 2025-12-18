import InfosCards from "./InfosCards.jsx";
import { Link } from "react-router-dom";

export default function MainPageEmployee({ employees = [], onRefresh, search }) {
  return (
    <main id="cardMain" className="main-page-employee">
      {/* 🔹 Cabeçalho de ações */}
      <section className="employee-actions">
        <div id="registerEmployee" className="register-employee">
          <Link to="/employee/register" className="link">
            Cadastrar Funcionário
          </Link>
        </div>
      </section>

      {/* 🔹 Listagem de funcionários */}
      <section className="employee-list">
        <div className="employee-list-container">
          <InfosCards employees={employees} onRefresh={onRefresh} search={search} />
        </div>
      </section>
    </main>
  );
}
