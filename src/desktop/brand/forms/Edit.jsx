import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PopUp from "../_components/PopUp";
import Load from "../_components/Load";

export default function EditModel() {
  const { uuid } = useParams();
  const host = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [popUp, setPopUp] = useState(false);

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [marca, setMarca] = useState("");

  const [marks, setMarks] = useState([]);
  const [testTypes, setTestTypes] = useState([]);
  const [shoeTypes, setShoeTypes] = useState([]);

  const [especificacoes, setEspecificacoes] = useState([]);

  // ============================
  // 🔥 Carregar dados iniciais
  // ============================
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);

        // ============================
        // Carregar modelo atual
        // ============================
        const res = await fetch(`${host}/model/search/${encodeURIComponent(uuid)}`);
        const data = await res.json();

        console.log(data)

        if (!data.modelo) throw new Error("Modelo não encontrado");

        setNome(data.modelo.nome);
        setTipo(data.modelo.tipo);
        setMarca(data.modelo.marca);

        setEspecificacoes(
          data.modelo.especificacoes?.map((e) => ({
            tipo: e.tipo,
            valor: e.valor,
          })) || []
        );

        // ============================
        // Carregar marcas
        // ============================
        const resMarks = await fetch(`${host}/mark/view`);
        const dataMarks = await resMarks.json();
        if (Array.isArray(dataMarks)) {
          const onlyNames = dataMarks.map((item) => item.marca);
          setMarks(onlyNames);
        }

        // ============================
        // Carregar tipos de teste ENUM
        // ============================
        const resTypes = await fetch(`${host}/mark/list`);
        const dataTypes = await resTypes.json();
        if (dataTypes.ok === 200) setTestTypes(dataTypes.types);

        // ============================
        // Carregar tipo de calçado ENUM
        // ============================
        const resShoe = await fetch(`${host}/mark/listTypeShoes`);
        const dataShoe = await resShoe.json();
        if (dataShoe.ok === 200) setShoeTypes(dataShoe.types);

      } catch (err) {
        setMsg(err.message);
        setPopUp(true);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [host, uuid]);

  // ============================
  // ➕ Adicionar especificação
  // ============================
  const addSpec = () => {
    setEspecificacoes([...especificacoes, { tipo: "", valor: "" }]);
  };

  // ============================
  // ➖ Remover especificação
  // ============================
  const removeSpec = (index) => {
    setEspecificacoes(especificacoes.filter((_, i) => i !== index));
  };

  // ============================
  // ✏ Atualizar especificação
  // ============================
  const updateSpec = (index, field, value) => {
    const clone = [...especificacoes];
    clone[index][field] = value;
    setEspecificacoes(clone);
  };

  // ============================
  // 📤 Enviar atualização
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataModel = {
      uuid,
      nome,
      tipo,
      marca,
      especificacoes,
    };

    try {
      setLoading(true);

      const res = await fetch(`${host}/model/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataModel),
      });

      const data = await res.json();
      if (data.status !== 200) throw new Error(data.msg);

      setMsg("Modelo atualizado com sucesso!");
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
          <h1 className="tittle">Editar Modelo</h1>
        </header>

        <section className="register-section">
          <div className="formMain">
            <div className="form-container">

              <form onSubmit={handleSubmit} id="editFormModel">

                {/* Nome */}
                <div>
                  <label htmlFor="nome">Nome do Modelo</label>
                  <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                {/* Tipo */}
                <div>
                  <label htmlFor="tipo">Tipo</label>
                  <select
                    id="tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                  >
                    <option value="">Selecione o tipo</option>

                    {shoeTypes.map((t, i) => (
                      <option key={i} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Especificações */}
                <div>
                  <label>Especificações do Modelo</label>

                  {especificacoes.map((esp, index) => (
                    <div key={index} className="spec-item">

                      <select
                        value={esp.tipo}
                        onChange={(e) =>
                          updateSpec(index, "tipo", e.target.value)
                        }
                        required
                      >
                        <option value="">Tipo do Teste</option>
                        {testTypes.map((t, i) => (
                          <option key={i} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>

                      <input
                        type="number"
                        placeholder="Valor"
                        value={esp.valor}
                        onChange={(e) =>
                          updateSpec(index, "valor", e.target.value)
                        }
                        required
                      />

                      {index > 0 && (
                        <button
                          type="button"
                          className="remove-btn"
                          onClick={() => removeSpec(index)}
                        >
                          Remover
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    className="add-btn"
                    onClick={addSpec}
                  >
                    Adicionar Especificação
                  </button>
                </div>

                {/* Marca */}
                <div>
                  <label htmlFor="marca">Marca</label>
                  <select
                    id="marca"
                    value={marca}
                    onChange={(e) => setMarca(e.target.value)}
                    required
                  >
                    <option value="">Selecione uma marca</option>
                    {marks.map((m, i) => (
                      <option key={i} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Botões */}
                <div className="but">
                  <Link to="/model" className="material-symbols-outlined arrow-back">
                    arrow_back
                  </Link>

                  <button type="submit">
                    Salvar
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
