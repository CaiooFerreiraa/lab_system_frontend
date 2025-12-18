import InfosCards from "./InfosCards.jsx";
import { Link } from "react-router-dom";

export default function MainPageProduct({ products = [], onRefresh, search }) {
  return (
    <main id="cardMain" className="main-page-employee">
      {/* 🔹 Cabeçalho de ações */}
      <section className="employee-actions">
        <div id="registerEmployee" className="register-employee">
          <Link to="/product/register" className="link">
            Cadastrar Produto
          </Link>
        </div>
      </section>

      {/* 🔹 Listagem de funcionários */}
      <section className="employee-list">
        <div className="employee-list-container">
          <InfosCards products={products} onRefresh={onRefresh} search={search} />
        </div>
      </section>
    </main>
  );
}
