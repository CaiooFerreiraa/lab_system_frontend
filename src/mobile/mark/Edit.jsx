import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Edit() {
  const [markData, setMarkData] = useState({ marca: "", metodo: [] });
  const host = import.meta.env.VITE_API_URL;
  const useRefer = useRef(false);
  const { mark } = useParams();

  useEffect(() => {
    if (useRefer.current) return;
    useRefer.current = true;

    // 🔹 Busca dados da marca pelo nome (GET)
    fetch(`${host}/mark/update/${mark}`)
      .then(res => res.json())
      .then(response => {
        setMarkData(response[0]);
      })
      .catch(err => console.error("Erro ao buscar marca:", err));
  }, [host, mark]);

  const handleChangeMethod = (index, field, value) => {
    const updatedMethods = [...markData.metodo];
    updatedMethods[index][field] = value;
    setMarkData({ ...markData, metodo: updatedMethods });
  };

  function addMethod() {
    setMarkData(prev => ({
      ...prev,
      metodo: [...prev.metodo, { nome: "", descricao: "" }]
    }));
  }

  const handleDeleteMethod = (cod_metodo) => {
    if (!cod_metodo) {
      setMarkData(prev => ({
        ...prev,
        metodo: prev.metodo.filter(m => m.cod_metodo !== cod_metodo)
      }));
      return;
    }

    if (!confirm("Deseja realmente deletar este método?")) return;

    fetch(`${host}/mark/delete/method/${cod_metodo}`,{method: 'DELETE'})
      .then(response => console.log(response))
      .catch(err => console.error("Houve um erro: " + err))
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();

    // 🔹 Atualiza os dados (PUT ou POST)
    fetch(`${host}/mark/updateMark`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(markData),
    })
      .catch(err => console.error("Erro ao atualizar:", err));
  };

  return (
    <>
      <h1 className="tittle">Editar Marca: {mark}</h1>
      <div>
        <form onSubmit={handleSubmit} id="editFormMark">
          <div>
            <label>Marca</label>
            <input
              type="text"
              defaultValue={markData.marca}
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
                defaultValue={met.nome}
                onChange={(e) =>
                  handleChangeMethod(index, "nome", e.target.value)
                }
              />
              <textarea
                placeholder="Descrição"
                defaultValue={met.descricao}
                onChange={(e) =>
                  handleChangeMethod(index, "descricao", e.target.value)
                }
              />
              <button className="material-symbols-outlined deleteMethod" onClick={() => handleDeleteMethod(met.cod_metodo)}>delete</button>
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
            <button type="submit">Salvar</button>
            <Link to="/mark" className="material-symbols-outlined arrow-back">
              arrow_back
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
