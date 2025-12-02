import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PopUp from "./_components/PopUp";
import Load from "./_components/Load";

export default function Register() {
  const [product, setProduct] = useState("");
  const [sector, setSector] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [type, setType] = useState("");
  const [dataSector, setDataSector] = useState([])
  const host = import.meta.env.VITE_API_URL;

  const fetchMarkFromApi = () => {
    fetch(`${host}/sector/read`)
      .then(response => response.json())
      .then(dataSector => {
        setDataSector(dataSector.setores)
      })
      .catch(err => console.error("Houve um erro: " + err))
  }

  useEffect(() => {
    fetchMarkFromApi()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);

    const dataProduct = {
      referencia: product,
      tipo: type,
      setor: sector 
    };

    try {
      const response = await fetch(`${host}/product/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataProduct),
      });

      const responseData = await response.json();

      if (!responseData.status) throw new Error(responseData.msg);

      setMsg(responseData.msg);
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
          <h1 className="tittle">Registrar Produto</h1>
        </header>

        <section className="register-section">
          <div className="formMain">
            <div className="form-container">
              <form onSubmit={handleRegister} id="registerFormMark">
                <div>
                  <fieldset className="labelForm shifts">
                    <div className="shift-options">
                      <label htmlFor="DN">
                        DN
                        <input
                          type="radio"
                          name="referencia"
                          id="DN"
                          defaultValue="DN"
                          checked={type === "DN"}
                          onChange={(e) => setType(e.target.value)}
                        />
                      </label>

                      <label htmlFor="BN">
                        BN
                        <input
                          type="radio"
                          name="referencia"
                          id="BN"
                          defaultValue="BN"
                          checked={type === "BN"}
                          onChange={(e) => setType(e.target.value)}
                        />
                      </label>
                    </div>
                  </fieldset>

                  <label htmlFor="product">Referência do produto</label>
                  <input
                    type="text"
                    name="product"
                    id="product"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    required
                  />

                  <select name="mark" id="mark" onChange={(e) => setSector(e.target.value)}>
                    <option>Selecione uma marca</option>
                    {dataSector.map((sector, index) => {
                      return <option value={sector.nome} key={index}>{sector.nome}</option>
                    })}
                  </select>
                </div>

                <div className="but">
                    <Link to="/product" className="material-symbols-outlined arrow-back">
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
