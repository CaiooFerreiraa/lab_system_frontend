import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PopUp from "../_components/PopUp";
import Load from "../_components/Load";

export default function RegisterModel() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [marca, setMarca] = useState("");

  // especificações dinâmicas
  const [especificacoes, setEspecificacoes] = useState([
    { tipo: "", valor: "", variacao: "" },
  ]);

  // dados do backend
  const [marks, setMarks] = useState([]);
  const [testTypes, setTestTypes] = useState([]);
  const [shoeTypes, setShoeTypes] = useState([]);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [popUp, setPopUp] = useState(false);

  const host = import.meta.env.VITE_API_URL;

  // ============================
  // 🔥 Carregar marcas
  // ============================
  useEffect(() => {
    const loadMarks = async () => {
      try {
        const res = await fetch(`${host}/mark/view`);
        const data = await res.json();

        if (Array.isArray(data)) {
          const onlyNames = data.map((item) => item.marca);
          setMarks(onlyNames);
        }
      } catch (err) {
        console.log("Erro ao carregar marcas:", err);
      }
    };

    loadMarks();
  }, []);

  // ============================
  // 🔥 Carregar tipos do ENUM
  // ============================
  useEffect(() => {
    const loadTypes = async () => {
      try {
        const res = await fetch(`${host}/mark/list`);
        const data = await res.json();

        if (data.ok === 200) {
          setTestTypes(data.types);
        }
      } catch (err) {
        console.log("Erro ao carregar tipos:", err);
      }
    };

    const loadTypesShoe = async () => {
      try {
        const res = await fetch(`${host}/mark/listTypeShoes`);
        const data = await res.json();

        if (data.ok === 200) {
          setShoeTypes(data.types);
        }
      } catch (err) {
        console.log("Erro ao carregar tipos:", err);
      }
    };

    loadTypes();
    loadTypesShoe();
  }, []);

  // ============================
  // ➕ Adicionar especificação
  // ============================
  const addSpec = () => {
    setEspecificacoes([
      ...especificacoes,
      { tipo: "", valor: "", variacao: "" },
    ]);
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
  // 📤 Enviar formulário
  // ============================
  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);

    const dataModel = {
      nome,
      tipo,
      marca,
      especificacoes,
    };

    try {
      const response = await fetch(`${host}/model/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataModel),
      });

      const responseData = await response.json();

      if (responseData.status !== 200)
        throw new Error(responseData.msg || "Erro ao cadastrar modelo");

      setMsg("Modelo cadastrado com sucesso!");
      setPopUp(true);

      // resetar campos
      setNome("");
      setTipo("");
      setMarca("");
      setEspecificacoes([{ tipo: "", valor: "", variacao: "" }]);
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
          <h1 className="tittle">Cadastrar Modelo</h1>
        </header>

        <section className="register-section">
          <div className="formMain">
            <div className="form-model">

              <form onSubmit={handleRegister} id="registerFormModel">

                {/* Nome */}
                <div>
                  <label htmlFor="nome">Nome do Modelo *</label>
                  <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                {/* Tipo */}
                <div className="input-tipo">
                  <label htmlFor="tipo">Tipo *</label>
                  <select
                    id="tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    required
                  >
                    <option value="">Selecione o Tipo do Tênis</option>
                    {shoeTypes.map((t, i) => (
                      <option key={i} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Especificações Dinâmicas */}
                <div className="list-testes">
                  <label>Especificações do Modelo</label>

                  {especificacoes.map((esp, index) => (
                    <div key={index} className="spec-item">

                      {/* Tipo de Teste */}
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

                      {/* Valor */}
                      <input
                        type="number"
                        placeholder="Valor"
                        value={esp.valor}
                        onChange={(e) =>
                          updateSpec(index, "valor", e.target.value)
                        }
                        required
                      />

                      {/* Variação */}
                      <input
                        type="number"
                        placeholder="Variação"
                        value={esp.variacao}
                        onChange={(e) =>
                          updateSpec(index, "variacao", e.target.value)
                        }
                        required
                      />

                      <button
                        type="button"
                        className="remove-btn material-symbols-outlined"
                        onClick={() => removeSpec(index)}
                      >
                        delete
                      </button>
                    </div>
                  ))}

                  <button type="button" className="add-btn" onClick={addSpec}>
                    Adicionar Especificação
                  </button>
                </div>

                {/* Marca */}
                <div className="input-tipo">
                  <label htmlFor="marca">Marca *</label>
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

                  <button type="submit" disabled={loading}>
                    {loading ? "Cadastrando..." : "Cadastrar"}
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
