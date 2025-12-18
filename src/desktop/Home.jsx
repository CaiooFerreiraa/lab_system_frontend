import { useState, useEffect } from 'react'
import './css/Home.css'
import Employee from './employee/Employee';
import Mark from './mark/Mark';
import Product from './product/Product';
import Sector from './sector/Sector';

import RegisterEmployee from '../mobile/employee/Register';
import { NavLink, Link } from 'react-router-dom';
import EditEmployee from '../mobile/employee/Edit';
import RegisterMark from '../mobile/mark/Register';
import EditMark from '../mobile/mark/Edit';
import RegisterProduct from '../mobile/product/Register';
import Edit from './product/Edit';

// Importações de setor
import RegisterSector from './sector/forms/Register';
import EditSector from './sector/forms/Edit';
import SectorInfo from './sector/forms/SectorInfo'; // Novo componente

// Importações de modelo
import Model from './brand/Model';
import RegisterModel from './brand/forms/Register';
import EditModel from './brand/forms/Edit';
import ModelInfo from './brand/ModelInfo';

//Importações de Teste
import Test from './test/Test';
import TestRegister from './test/forms/Register'

export default function HomeDesktop({page}) {
  const [screen, setScreen] = useState(page || null);
  const [search, setSearch] = useState("");
  const [element, setElement] = useState("");

  useEffect(() => {
    setScreen(page);
    if (page === "employee") setElement("Funcionário");
    else if (page === "mark") setElement("Marca");
    else if (page === "product") setElement("Produto");
    else if (page === "sector") setElement("Setor");
    else if (page === "model") setElement("Modelo");
    else if (page === "test") setElement("Teste");
    else setElement("");
  }, [page]);

  const handleSearchChange = (e) => setSearch(e.target.value);

  return (
    <main className='mainDesktop'>
      <nav className='navDesktop'>
        <ul>
          <li>
            <NavLink to="/employee" className="menu-link">
              <span className="material-symbols-outlined">person_apron</span>
              Funcionário
            </NavLink>
          </li>
          <li>
            <NavLink to="/mark" className="menu-link">
              <span className="material-symbols-outlined">diamond</span>
              Marca
            </NavLink>
          </li>
          <li>
            <NavLink to="/sector" className="menu-link">
              <span className='material-symbols-outlined'>lan</span>
              Setores
            </NavLink>
          </li>
          <li>
            <NavLink to="/product" className="menu-link">
              <span className='material-symbols-outlined'>package_2</span>
              Produtos
            </NavLink>
          </li>
          <li>
            <NavLink to="/model" className="menu-link">
              <span className='material-symbols-outlined'>steps</span>
              Modelos
            </NavLink>
          </li>
          <li>
            <NavLink to="/test" className="menu-link">
              <span className='material-symbols-outlined'>science</span>
              Testes
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
            {element === "Produto" && ( <Link to={'/product/register'} className='link-desktop'>Cadastrar {element}</Link> )}
            {element === "Setor" && ( <Link to={'/sector/register'} className='link-desktop'>Cadastrar {element}</Link> )}
            {element === "Modelo" && ( <Link to={'/model/register'} className='link-desktop'>Cadastrar {element}</Link> )}
            {element === "Teste" && ( <Link to={'/test/register'} className='link-desktop'>Cadastrar {element}</Link> )}
          </div>
        </header>

        <div className='componente'>
          {/* Telas principais */}
          {screen === "employee" && <Employee search={search} />}
          {screen === "mark" && <Mark search={search} />}
          {screen === "product" && <Product search={search} />}
          {screen === 'sector' && <Sector search={search}/>}
          {screen === 'model' && <Model search={search}/>}
          {screen === 'test' && <Test search={search}/>}

          {/* Funcionário */}
          {page === "employee-register" && <RegisterEmployee />}
          {page === "employee-edit" && <EditEmployee />}

          {/* Marca */}
          {page === "mark-register" && <RegisterMark />}
          {page === "mark-edit" && <EditMark />}

          {/* Produto */}
          {page === "product-register" && <RegisterProduct />}
          {page === "product-edit" && <Edit/>}

          {/* Setor */}
          {page === 'sector-register' && <RegisterSector/>}
          {page === 'sector-edit' && <EditSector/>}
          {page === 'sector-view' && <SectorInfo />} {/* Nova rota */}

          {/* Modelo */}
          {page === 'model-register' && <RegisterModel/>}
          {page === 'model-edit' && <EditModel/>}
          {page === "model-view" && <ModelInfo />}

          {/* Teste */}
          {page === 'test-register' && <TestRegister/>}
        </div>
      </div>
    </main>
  )
}