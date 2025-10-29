import { useState } from "react";
import { Link } from "react-router-dom";
import PopUp from "./_components/PopUp";

export default function Register() {
  const [methods, setMethods] = useState([{ id: Date.now(), name: "", description: "" }]);
  const [mark, setMark] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [popUp, setPopUp] = useState(false);

  const host = import.meta.env.VITE_API_URL;

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);

    const dataMark = {
      marca: mark,
      // eslint-disable-next-line no-unused-vars
      metodos: methods.map(({ id, ...rest }) => rest),
    };

    try {
      const response = await fetch(`${host}/mark/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataMark),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar marca");

      setMsg("Marca cadastrada com sucesso!");
      setPopUp(true);
    } catch (err) {
      console.error(err);
      setMsg("Erro ao cadastrar. Verifique os dados.");
      setPopUp(true);
    } finally {
      setLoading(false);
    }
  };

  const addMethod = () => {
    setMethods((prev) => [...prev, { id: Date.now(), name: "", description: "" }]);
  };

  const handleDeleteMethod = (idToDelete) => {
    if (window.confirm("Deseja remover este método?")) {
      setMethods((prev) => prev.filter((m) => m.id !== idToDelete));
    }
  };

  const handleChange = (id, field, value) => {
    setMethods((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  return (
    <>
      <h1 className="tittle">Registrar Marca</h1>
      <form onSubmit={handleRegister} id="registerFormMark">
        <div>
          <label htmlFor="mark">Nome da Marca</label>
          <input
            type="text"
            name="mark"
            id="mark"
            value={mark}
            onChange={(e) => setMark(e.target.value)}
            required
          />
        </div>

        {methods.map((method, index) => (
          <div key={method.id}>
            <label htmlFor={`method-${method.id}`}>Nome do Método {index + 1}</label>
            <input
              type="text"
              id={`method-${method.id}`}
              value={method.name}
              onChange={(e) => handleChange(method.id, "name", e.target.value)}
              required
            />

            <label htmlFor={`description-${method.id}`}>
              Descrição do método {index + 1}
            </label>
            <textarea
              id={`description-${method.id}`}
              placeholder="Descrição do método..."
              value={method.description}
              onChange={(e) =>
                handleChange(method.id, "description", e.target.value)
              }
              required
            ></textarea>

            <button
              type="button"
              className="material-symbols-outlined deleteMethod"
              onClick={() => handleDeleteMethod(method.id)}
            >
              delete
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addMethod}
          className="material-symbols-outlined addMethod"
        >
          add_box
        </button>

        <div className="but">
          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
          <Link to="/mark" className="material-symbols-outlined arrow-back">
            arrow_back
          </Link>
        </div>
      </form>

      {popUp && <PopUp msg={msg} setPopUp={setPopUp}/>}
    </>
  );
}
