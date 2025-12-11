import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Load from "./_components/Load";
import PopUp from "./_components/PopUp";

export default function Edit() {
  const { uuid } = useParams();
  const host = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [msg, setMsg] = useState("");

  const [productData, setProductData] = useState({
    referencia: "",
    tipo: "",
    setor: "",
  });

  const [dataSector, setDataSector] = useState([]);

  // ---------------------------------------------------
  // 🔹 Carregar dados do produto ao abrir a página
  // ---------------------------------------------------
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${host}/product/search?uuid=${uuid}`);

        if (!res.ok) throw new Error("Falha ao carregar produto");

        const data = await res.json();
        const prod = data.material[0];

        console.log(prod)

        setProductData({
          referencia: prod.referencia,
          tipo: prod.tipo,
          setor: prod.setor || prod.nome_setor || prod.sector,  
        });

      } catch (err) {
        console.error(err);
        setMsg("Erro ao carregar produto.");
        setPopUp(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchSectors = async () => {
      try {
        const res = await fetch(`${host}/sector/read`);
        const data = await res.json();
        setDataSector(data.setores);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
    fetchSectors();
  }, [host, uuid]);

  // ---------------------------------------------------
  // 🔹 Submeter edição
  // ---------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(
        `${host}/product/edit?uuid=${uuid}&newcode=${productData.referencia}&newtipo=${productData.tipo}&newsector=${productData.setor}`,
        { method: "PUT" }
      );

      if (!res.ok) throw new Error("Não foi possível atualizar o produto");

      setMsg("Produto atualizado com sucesso!");
      setPopUp(true);
    } catch (err) {
      console.error(err);
      setMsg("Erro ao atualizar produto.");
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
          <h1 className="tittle">Editar Produto: {uuid}</h1>
        </header>

        <section className="register-section">
          <div className="formMain">
            <div className="form-container">

              <form onSubmit={handleSubmit} id="registerFormProduct">

                {/* 🔹 Tipo (Primary Radio) */}
                <fieldset className="labelForm shifts">
                  <div className="shift-options">

                    <input
                      type="radio"
                      id="DN"
                      name="tipo"
                      value="DN"
                      checked={productData.tipo === "DN"}
                      onChange={(e) =>
                        setProductData({ ...productData, tipo: e.target.value })
                      }
                    />
                    <label htmlFor="DN">
                      DN
                    </label>

                    <input
                      type="radio"
                      id="BN"
                      name="tipo"
                      value="BN"
                      checked={productData.tipo === "BN"}
                      onChange={(e) =>
                        setProductData({ ...productData, tipo: e.target.value })
                      }
                    />

                    <label htmlFor="BN">
                      BN
                    </label>

                    <input
                      type="radio"
                      id="Base"
                      name="tipo"
                      value="Base"
                      checked={productData.tipo === "Base"}
                      onChange={(e) =>
                        setProductData({ ...productData, tipo: e.target.value })
                      }
                    />
                    <label htmlFor="Base">
                      Base
                    </label>

                  </div>
                </fieldset>

                {/* 🔹 Referência */}
                <label htmlFor="ref">Código do Produto *</label>
                <input
                  type="text"
                  id="ref"
                  value={productData.referencia}
                  onChange={(e) => {
                    if (e.target.value.includes("/")) {
                      setMsg("A referência não pode conter barra")
                      setPopUp(true)
                    }
                    const value = e.target.value.replace(/\//g, "")
                    setProductData({ ...productData, referencia: value })
                  }}
                  required
                />

                {/* 🔹 Setor */}
                <label htmlFor="sector">Setor *</label>
                
                  <div className="custom-select">
                    <select
                      id="sector"
                      value={productData.setor}
                      onChange={(e) => {
                        setProductData({ ...productData, setor: e.target.value })
                      }}
                      required
                    >
                      <option>Selecione um Setor</option>
                      {dataSector.map((sec, idx) => (
                        <option key={idx} value={sec.nome}>
                          {sec.nome}
                        </option>
                      ))}
                    </select>
                  </div>

                {/* 🔹 Botões */}
                <div className="but">
                  <Link
                    to="/product"
                    className="material-symbols-outlined arrow-back"
                  >
                    arrow_back
                  </Link>

                  <button type="submit">Atualizar</button>
                </div>

              </form>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
