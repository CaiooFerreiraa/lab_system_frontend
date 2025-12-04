import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PopUp from "../_components/PopUp";
import Load from "../_components/Load";

export default function EditSector() {
  const { nome } = useParams();
  const host = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [popUp, setPopUp] = useState(false);

  const [oldName, setOldName] = useState("");
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchSector = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${host}/sector/search?nome=${nome}`);
        const data = await res.json();

        console.log(data.setor[0].nome)

        if (!data.setor) throw new Error("Setor não encontrado");

        setOldName(data.setor[0].nome);
        setNewName(data.setor[0].nome);

      } catch (err) {
        setMsg(err.message);
        setPopUp(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSector();
  }, [host, nome]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        `${host}/sector/edit?oldName=${oldName}&newName=${newName}`,
        { method: "PUT" }
      );

      const data = await res.json();
      if (data.ok !== 200) throw new Error(data.msg);

      setMsg("Setor atualizado com sucesso!");
      setPopUp(true);

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
          <h1 className="tittle">Editar Setor</h1>
        </header>

        <section className="register-section">
          <div className="formMain">
            <div className="form-sector">

              <form onSubmit={handleSubmit}>

                <label>Nome atual</label>
                <input type="text" value={oldName} disabled />

                <label>Novo nome</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                />

                <div className="but">
                  <Link to="/sector" className="material-symbols-outlined arrow-back">
                    arrow_back
                  </Link>
                  <button type="submit">Salvar</button>
                </div>

              </form>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
