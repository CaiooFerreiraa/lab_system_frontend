import { useState } from "react";
import { Link } from "react-router-dom";
import PopUp from "../_components/PopUp";
import Load from "../_components/Load";

export default function RegisterSector() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [popUp, setPopUp] = useState(false);

  const host = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`${host}/sector/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: name }),
      });

      const response = await res.json();

      if (response.ok !== 200 && response.ok !== undefined)
        throw new Error(response.msg);

      setMsg("Setor cadastrado com sucesso!");
      setPopUp(true);
      setName("");

    } catch (err) {
      setMsg(err.message);
      setPopUp(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Load />}
      {popUp && <PopUp msg={msg} setPopUp={setPopUp} />}

      <main className="register-main">
        <header className="register-header">
          <h1 className="tittle">Cadastrar Setor</h1>
        </header>

        <section className="register-section">
          <div className="formMain">
            <div className="form-sector">

              <form onSubmit={handleSubmit}>
                <label htmlFor="sector">Nome do Setor</label>
                <input
                  type="text"
                  id="sector"
                  value={name}
                  onChange={(e) => {
                    if (e.target.value.includes("/")) {
                      setMsg("O nome do setor não pode conter barra")
                      setPopUp(true)
                    }
                    const value = e.target.value.replace(/\//g, "")
                    setName(value)
                  }}
                  required
                />

                <div className="but">
                  <Link to="/sector" className="material-symbols-outlined arrow-back">
                    arrow_back
                  </Link>

                  <button type="submit">
                    Cadastrar
                  </button>
                </div>

              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
