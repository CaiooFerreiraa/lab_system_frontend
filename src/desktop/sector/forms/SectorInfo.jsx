import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PopUp from "../_components/PopUp";
import Load from "../_components/Load";

export default function SectorInfo() {
  const { nome } = useParams();
  const navigate = useNavigate();
  const host = import.meta.env.VITE_API_URL;

  const [data, setData] = useState(null);
  const [materiais, setMateriais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [materiaisLoading, setMateriaisLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [popUp, setPopUp] = useState(false);

  // Buscar dados do setor
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${host}/sector/search?uuid=${encodeURIComponent(nome)}`);
        const json = await res.json();

        if (json.ok === 200 && json.setor?.length > 0) {
          setData(json.setor[0]);
        } else {
          setData({ nome });
        }
      } catch (err) {
        setMsg("Erro ao carregar setor: " + err.message);
        setPopUp(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nome]);

  // Buscar materiais do setor
  useEffect(() => {
    const fetchMateriais = async () => {
      try {
        setMateriaisLoading(true);
        const res = await fetch(`${host}/sector/list?uuid=${encodeURIComponent(nome)}`);
        const json = await res.json();

        console.log(json)

        if (json.ok === 200) {
          setMateriais(json.setor || []);
        } else {
          setMateriais([]);
        }
      } catch (err) {
        console.error("Erro ao buscar materiais", err);
        setMateriais([]);
      } finally {
        setMateriaisLoading(false);
      }
    };

    if (data) fetchMateriais();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, nome]);

  // Excluir setor
  const handleDelete = async () => {
    if (!confirm("Deseja excluir este setor?")) return;

    try {
      setLoading(true);
      const res = await fetch(`${host}/sector/delete?nome=${nome}`, {
        method: "DELETE",
      });
      const json = await res.json();

      if (json.ok !== 200) {
        throw new Error(json.msg || "Erro ao excluir setor");
      }

      setMsg("Setor excluído com sucesso!");
      setPopUp(true);

      setTimeout(() => navigate("/sector"), 1000);
    } catch (err) {
      setMsg(err.message);
      setPopUp(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMaterial = () => {
    navigate(`/product/register`);
  };

  if (loading) return <Load />;
  if (!data) return <h2>Setor não encontrado</h2>;

  return (
    <>
      {popUp && <PopUp msg={msg} setPopUp={setPopUp} />}

      <main className="model-info-container">
        <div className="top-actions">
          <Link to="/sector" className="material-symbols-outlined arrow-back">arrow_back</Link>

          <div className="action-buttons">
            <button 
              className="material-symbols-outlined edit-btn"
              onClick={() => navigate(`/sector/edit/${nome}`)}
            >
              edit
            </button>

            <button 
              className="material-symbols-outlined delete-btn"
              onClick={handleDelete}
            >
              delete
            </button>
          </div>
        </div>

        <h1>Setor: {data.nome}</h1>

        {/* Lista simples de materiais */}
        <h2>Materiais ({materiais.length})</h2>

        <div className="spec-list">
          {materiaisLoading ? (
            <p>Carregando materiais...</p>
          ) : materiais.length === 0 ? (
            <p>Nenhum material encontrado neste setor.</p>
          ) : (
            materiais.map((material, i) => (
              <div 
                key={i}
                className="spec-item material-detail"
                style={{ cursor: "pointer" }}
              >
                <div className="material-header">
                  <h3>{material.tipo} — {material["Referência"]}</h3>
                  {material.Quantidade && (
                    <span className="quantity-badge">{material.Quantidade} un.</span>
                  )}
                </div>

                {material.Descricao && (
                  <p><b>Descrição:</b> {material.Descricao}</p>
                )}
              </div>
            ))
          )}
        </div>

        <div className="action-footer">
          <button className="btn-primary" onClick={handleAddMaterial}>
            <span className="material-symbols-outlined">add</span>
            Adicionar Material
          </button>
        </div>
      </main>
    </>
  );
}
