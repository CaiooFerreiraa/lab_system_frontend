import Header from "./_components/Header.jsx";
import { useEffect, useState } from "react";
import MainCard from "./_components/MainPageEmployee.jsx";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const host = import.meta.env.VITE_API_URL;
  const [search, setSearch] = useState("");

  const fetchEmployeeFromApi = () => {
    fetch(`${host}/employee/view`)
      .then((response) => response.json())
      .then((dataEmployees) => setEmployees(dataEmployees))
      .catch((err) => console.error("Houve um error: ", err));
  };

  useEffect(() => {
    fetchEmployeeFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="main">
      {/* Cabeçalho fixo/topo */}
      <header className="home-header">
        <Header tittle={"Funcionários"} setSearch={setSearch} />
      </header>

      {/* Container principal centralizado */}
      <section className="home-content">
        <div className="content-wrapper">
          <MainCard
            employees={employees}
            search={search}
            onRefresh={fetchEmployeeFromApi}
          />
        </div>
      </section>
    </main>
  );
}
