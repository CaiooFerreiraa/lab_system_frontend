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
        const res = await fetch(`${host}/product/search/${uuid}`);

        if (!res.ok) throw new Error("Falha ao carregar produto");

        const data = await res.json();
        const prod = data.material[0];

        setProductData({
          referencia: prod.referencia,
          tipo: prod.tipo,
          setor: prod.setor,
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

              <form onSubmit={handleSubmit} id="editFormProduct">

                {/* 🔹 Tipo (Primary Radio) */}
                <fieldset className="labelForm shifts">
                  <div className="shift-options">

                    <label htmlFor="DN">
                      DN
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
                    </label>

                    <label htmlFor="BN">
                      BN
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
                    </label>

                  </div>
                </fieldset>

                {/* 🔹 Referência */}
                <label htmlFor="ref">Referência</label>
                <input
                  type="text"
                  id="ref"
                  value={productData.referencia}
                  onChange={(e) =>
                    setProductData({ ...productData, referencia: e.target.value })
                  }
                  required
                />

                {/* 🔹 Setor */}
                <label htmlFor="sector">Setor</label>
                <select
                  id="sector"
                  value={productData.setor}
                  onChange={(e) =>
                    setProductData({ ...productData, setor: e.target.value })
                  }
                  required
                >
                  <option value="">Selecione um setor</option>

                  {dataSector.map((sec, idx) => (
                    <option key={idx} value={sec.nome}>
                      {sec.nome}
                    </option>
                  ))}
                </select>

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
