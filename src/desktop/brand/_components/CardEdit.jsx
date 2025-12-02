import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Load from "./_components/Load";
import PopUp from "./_components/PopUp";

export default function ModelEdit() {
  const { id } = useParams();
  const host = import.meta.env.VITE_API_URL;

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [especificacao, setEspecificacao] = useState("");
  const [marca, setMarca] = useState("");

  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${host}/model/search/${id}`)
      .then((r) => r.json())
      .then((data) => {
        const m = data.modelo[0];
        setNome(m.nome);
        setTipo(m.tipo);
        setEspecificacao(m.especificacao_modelo);
        setMarca(m.cod_marca);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = () => {
    setLoading(true);

    fetch(`${host}/model/edit?id=${id}&newName=${nome}&newTipo=${tipo}&newEspecificacao=${especificacao}&newMarca=${marca}`)
      .then(() => {
        setMsg("Modelo atualizado com sucesso!");
        setPopUp(true);
      })
      .catch(() => {
        setMsg("Erro ao atualizar modelo.");
        setPopUp(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {loading && <Load />}
      {popUp && <PopUp msg={msg} setPopUp={setPopUp} />}

      <div className="formContainer">
        <h2>Editar Modelo</h2>

        <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
        <input value={tipo} onChange={(e) => setTipo(e.target.value)} placeholder="Tipo" />
        <input
          value={especificacao}
          onChange={(e) => setEspecificacao(e.target.value)}
          placeholder="Especificação"
        />
        <input value={marca} onChange={(e) => setMarca(e.target.value)} placeholder="Marca (nome)" />

        <button onClick={handleSubmit}>Salvar</button>
      </div>
    </>
  );
}
