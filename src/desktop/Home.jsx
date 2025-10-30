import {  useState, useEffect } from 'react'
import './css/Home.css'
import Employee from './employee/Employee';
import Mark from './mark/Mark';
import RegisterEmployee from '../mobile/employee/Register';
import { NavLink, Link } from 'react-router-dom';
import EditEmployee from '../mobile/employee/Edit';
import RegisterMark from '../mobile/mark/Register';
import EditMark from '../mobile/mark/Edit';

export default function HomeDesktop({page}) {
  const [screen, setScreen] = useState(page || null); // "employee" | "mark" | null
  const [search, setSearch] = useState("");
  const [element, setElement] = useState("");

  useEffect(() => {
    setScreen(page);
    if (page === "employee") setElement("Funcionário");
    else if (page === "mark") setElement("Marca");
    else setElement("");
  }, [page]);

  const handleSearchChange = (e) => setSearch(e.target.value); // atualiza em tempo real

  return (
    <main className='mainDesktop'>
    <nav className='navDesktop'>
      <ul>
        <li>
          <NavLink to="/employee" className="menu-link">
            <span class="material-symbols-outlined">person_apron</span>
            Funcionário
          </NavLink>
        </li>
        <li>
          <NavLink to="/mark" className="menu-link">
            <span class="material-symbols-outlined">diamond</span>
            Marca
          </NavLink>
        </li>
      </ul>
    </nav>


      <div className="container">
        <header className='headerDesktop'>
          <div className='container-search'>
            <input
              type="text"
              placeholder="Pesquisa Global..."
              value={search}
              onChange={handleSearchChange}
            />
            {element === "Funcionário" && ( <Link to={'/employee/register'} className='link-desktop'>Cadastrar {element}</Link> )}
            {element === "Marca" && ( <Link to={'/mark/register'} className='link-desktop'>Cadastrar {element}</Link> )}
          </div>
        </header>

        <div className='componente'>
          {screen === "employee" && <Employee search={search} />}
          {screen === "mark" && <Mark search={search} />}
          {page === "employee-register" && <RegisterEmployee />}
          {page === "employee-edit" && <EditEmployee />}
          {page === "mark-register" && <RegisterMark />}
          {page === "mark-edit" && <EditMark />}
        </div>
      </div>
    </main>
  )
}
