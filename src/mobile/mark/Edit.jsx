import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Load from "./_components/Load";
import PopUp from "./_components/PopUp";

export default function Edit() {
  const [markData, setMarkData] = useState({ marca: "", metodo: [] });
  const host = import.meta.env.VITE_API_URL;
  const { mark } = useParams();

  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchMark = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${host}/mark/update/${mark}`);
        if (!res.ok) throw new Error("Erro ao buscar marca");
        const data = await res.json();
        setMarkData(data[0]);
      } catch (err) {
        console.error(err);
        setMsg("Erro ao carregar dados da marca.");
        setPopUp(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMark();
  }, [host, mark]);

  const handleChangeMethod = (index, field, value) => {
    setMarkData((prev) => {
      const updated = [...prev.metodo];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, metodo: updated };
    });
  };

  // 🔹 Adiciona um novo método
  const addMethod = () => {
    setMarkData((prev) => ({
      ...prev,
      metodo: [...prev.metodo, { nome: "", descricao: "" }],
    }));
  };

  // 🔹 Remove método (tanto local quanto no servidor)
  const handleDeleteMethod = async (cod_metodo) => {
    // Se o método ainda não foi salvo no backend
    if (!cod_metodo) {
      setMarkData((prev) => ({
        ...prev,
        metodo: prev.metodo.slice(0, -1),
      }));
      return;
    }

    if (!confirm("Deseja realmente deletar este método?")) return;

    try {
      setLoading(true);
      const res = await fetch(`${host}/mark/delete/method/${cod_metodo}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao deletar método");

      setMarkData((prev) => ({
        ...prev,
        metodo: prev.metodo.filter((m) => m.cod_metodo !== cod_metodo),
      }));

      setMsg("Método deletado com sucesso!");
      setPopUp(true);
    } catch (err) {
      console.error(err);
      setMsg("Erro ao deletar método.");
      setPopUp(true);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Submete a edição
  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(`${host}/mark/updateMark`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(markData),
      });

      if (!res.ok) throw new Error("Erro ao atualizar marca");

      setMsg("Marca atualizada com sucesso!");
      setPopUp(true);
    } catch (err) {
      console.error(err);
      setMsg("Falha ao atualizar a marca.");
      setPopUp(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Load />}
      {popUp && <PopUp msg={msg} setPopUp={setPopUp} />}

      <h1 className="tittle">Editar Marca: {mark}</h1>

      <form onSubmit={handleSubmit} id="editFormMark">
        <div>
          <label>Marca</label>
          <input
            type="text"
            value={markData.marca || ""}
            onChange={(e) =>
              setMarkData({ ...markData, marca: e.target.value })
            }
            disabled
          />
        </div>

        <h3>Métodos</h3>
        {markData.metodo.map((met, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Nome do método"
              value={met.nome || ""}
              onChange={(e) =>
                handleChangeMethod(index, "nome", e.target.value)
              }
            />
            <textarea
              placeholder="Descrição"
              value={met.descricao || ""}
              onChange={(e) =>
                handleChangeMethod(index, "descricao", e.target.value)
              }
            />
            <button
              type="button"
              className="material-symbols-outlined deleteMethod"
              onClick={() => handleDeleteMethod(met.cod_metodo)}
            >
              delete
            </button>
          </div>
        ))}

        <div className="but">
          <button
            type="button"
            onClick={addMethod}
            className="material-symbols-outlined addMethod"
          >
            add_box
          </button>
          <button type="submit">Atualizar</button>
          <Link to="/mark" className="material-symbols-outlined arrow-back">
            arrow_back
          </Link>
        </div>
      </form>
    </>
  );
}
