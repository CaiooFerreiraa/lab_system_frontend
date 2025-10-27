import { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage({ tittle, setSearch }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearchClick = () => {
    if (searchOpen) {
      setQuery("");
      setSearch("");
    }
    setSearchOpen((prev) => !prev);
  };

  const handleSearchChange = (e) => setQuery(e.target.value);

  const handleSearchSubmit = (ev) => {
    ev.preventDefault();
    setSearch(query);
  };

  const handleMenu = () => {
    if (menuOpen) {
      // Animação de saída
      setIsClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setIsClosing(false);
      }, 400); // duração da animação no CSS
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <>
      <div id="headerBar">
        <h1>{tittle}</h1>
        <div id="buttons">
          <span
            className="material-symbols-outlined"
            onClick={handleSearchClick}
            style={{ cursor: "pointer" }}
          >
            search
          </span>
          <span
            className="material-symbols-outlined"
            onClick={handleMenu}
            style={{ cursor: "pointer" }}
          >
            menu
          </span>
        </div>
      </div>
      {(menuOpen || isClosing) && (
        <>
          <div className={`menu ${isClosing ? "closing" : "active"}`}>
            <button
              type="button"
              className="material-symbols-outlined closeButton"
              onClick={handleMenu}
            >
              close
            </button>

            <h2>Menu</h2>
            <ul>
              <li><Link to="/">Pagina Início</Link></li>
              <li><a href="#">Relatórios</a></li>
              <li><a href="#">Configurações</a></li>
            </ul>
          </div>

          <div
            id="overlay"
            className={`menu-overlay ${isClosing ? "fade-out" : ""}`}
            onClick={handleMenu}
          ></div>
        </>
      )}

      {/* BARRA DE PESQUISA */}
      {searchOpen && (
        <form onSubmit={handleSearchSubmit} className="formSearch">
          <input
            type="text"
            placeholder="Digite sua pesquisa..."
            value={query}
            onChange={handleSearchChange}
          />
          <button type="submit">Buscar</button>
        </form>
      )}
    </>
  );
}
