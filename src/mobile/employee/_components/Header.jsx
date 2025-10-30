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
      setIsClosing(true);
      setTimeout(() => {
        setMenuOpen(false);
        setIsClosing(false);
      }, 400); // duração da animação
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <header id="header">
      <div id="headerBar" className="header-bar">
        <h1 className="header-title">{tittle}</h1>

        <div id="buttons" className="header-buttons">
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

      {/* 🔹 Campo de busca */}
      {searchOpen && (
        <div className="header-search">
          <form onSubmit={handleSearchSubmit} className="formSearch">
            <input
              type="text"
              placeholder="Digite sua pesquisa..."
              value={query}
              onChange={handleSearchChange}
            />
            <button type="submit">Buscar</button>
          </form>
        </div>
      )}

      {/* 🔹 Menu lateral com overlay */}
      {(menuOpen || isClosing) && (
        <>
          <nav className={`menu ${isClosing ? "closing" : "active"}`}>
            <button
              type="button"
              className="material-symbols-outlined closeButton"
              onClick={handleMenu}
            >
              close
            </button>

            <h2>Menu</h2>
            <ul>
              <li><Link to="/">Página Início</Link></li>
              <li><a href="#">Relatórios</a></li>
              <li><a href="#">Configurações</a></li>
            </ul>
          </nav>

          <div
            id="overlay"
            className={`menu-overlay ${isClosing ? "fade-out" : ""}`}
            onClick={handleMenu}
          ></div>
        </>
      )}
    </header>
  );
}
