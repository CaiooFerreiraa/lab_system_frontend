import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage({ tittle, setSearch }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [query, setQuery] = useState("");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

// 🔹 Detecta quando a tela muda de tamanho
  useEffect(() => {
    const handleResize = () => {
    const desktop = window.innerWidth >= 1024;
    setIsDesktop(desktop);

    // 🔹 Garante que o menu fique visível no desktop
      if (desktop) {
        setMenuOpen(true);
        setIsClosing(false);
    } else {
        setMenuOpen(false);
      }
    };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);  
  }, []);

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
      {(menuOpen || isClosing || isDesktop) && ( 
        <> 
          <nav className={`menu ${ isDesktop ? "desktop" : isClosing ? "closing" : "active" }`} > 
            {/* Botão de fechar só no mobile */} 
            {!isDesktop && ( 
              <button type="button" className="material-symbols-outlined closeButton" onClick={handleMenu} > 
                close 
              </button> 
            )} 
            <h2>Menu</h2> 
            <ul> 
              <li><Link to="/">Página Início</Link></li>
              <li><a href="#">Relatórios</a></li>
              <li><a href="#">Configurações</a></li>
            </ul>
          </nav> 
          {/* Overlay somente no mobile */} 
          {!isDesktop && ( 
            <div id="overlay" className={`menu-overlay ${isClosing ? "fade-out" : ""}`} onClick={handleMenu} ></div> )} 
          </> 
        )}
    </header>
  );
}
