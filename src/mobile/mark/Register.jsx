import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [methods, setMethods] = useState([
    { id: Date.now(), name: "", description: "" }
  ]);
  const host = import.meta.env.VITE_API_URL;
  
  const handleRegister = (event) => {
    event.preventDefault();
    const form = document.querySelector('#registerFormMark');
    const data = new FormData(form);
    let dataMark = {
      marca: data.get("mark"),
      // eslint-disable-next-line no-unused-vars
      metodos: methods.map(({ id, ...rest }) => rest)
    };

    fetch(`${host}/mark/register`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(dataMark)
    })
      .then(response => {if (response.ok) alert("Marca cadastrada com sucesso")})
      .catch(err => console.error("Houve um erro: " + err));
  };

  function addMethod() {
    setMethods([...methods, { id: Date.now(), name: "", description: "" }]);
  }

  const handleDeleteMethod = (idToDelete) => {
    if (!window.confirm("Deseja remover este método?")) return;
    setMethods((prev) => prev.filter((m) => m.id !== idToDelete));
  };

  const handleChange = (id, field, value) => {
    setMethods((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  return (
    <>
      <h1 className="tittle">Registrar Marca</h1>
      <div>
        <form onSubmit={handleRegister} id="registerFormMark">
          <div>
            <label htmlFor="mark">Nome da Marca</label>
            <input type="text" name="mark" id="mark" />
          </div>

          {methods.map((method, index) => (
            <div key={method.id}>
              <label htmlFor={`method-${method.id}`}>Nome do Método {index + 1}</label>
              <input
                type="text"
                id={`method-${method.id}`}
                defaultValue={method.name}
                onChange={(e) => handleChange(method.id, "name", e.target.value)}
              />

              <label htmlFor={`description-${method.id}`}>Descrição do método {index + 1}</label>
              <textarea
                id={`description-${method.id}`}
                placeholder="Descrição do método..."
                defaultValue={method.description}
                onChange={(e) => handleChange(method.id, "description", e.target.value)}
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
            <button type="submit">Cadastrar</button>
            <Link to="/mark" className="material-symbols-outlined arrow-back">
              arrow_back
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
