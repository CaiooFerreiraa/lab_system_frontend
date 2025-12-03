import { useNavigate } from "react-router-dom"; 
import { useState } from "react";
import Load from "../_components/Load";

export default function Card({ elements = [], search = "", onRefresh }) { 
  const filteredItems = elements.filter((sector) => 
    sector.nome.toLowerCase().includes(search.toLowerCase()) 
  ); 

  return ( 
    <div> 
      {filteredItems.map((element, index) => ( 
        <InfoCard data={element} key={index} onRefresh={onRefresh} /> 
      ))} 
    </div> 
  ) 
} 

function InfoCard({data, onRefresh}) { 
  const host = import.meta.env.VITE_API_URL 
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);

  const handleViewSector = () => { 
    navigate(`/sector/view/${encodeURIComponent(data.nome)}`); 
  } 

  const handleDelete = async () => { 
    if (!confirm("Deseja excluir esse setor?")) return; 
    
    try {
      setLoading(true);
      const res = await fetch(`${host}/sector/delete?nome=${data.nome}`, { 
        method: "DELETE", 
      });
      
      const response = await res.json();
      
      if (response.ok !== 200) {
        throw new Error(response.msg || "Erro ao excluir setor");
      }
      
      alert("Setor excluído com sucesso!");
      onRefresh();
      
    } catch (err) {
      console.error("Houve um erro: ", err);
      alert(err.message || "Erro ao excluir setor");
    } finally {
      setLoading(false);
    }
  }; 

  const handleEdit = (ev) => { 
    ev.stopPropagation();
    navigate(`/sector/edit/${data.nome.toLowerCase()}`); 
  }; 

  return ( 
    <>
      {loading && <Load />}
      <div className="cardMark-desktop" onClick={handleViewSector}> 
        <div className="infos" key={data.nome}> 
          <span className="nameMark value">{data.nome[0]?.toUpperCase() || "S"}</span> 
          <span className="setor value">
            {data.nome[0]?.toUpperCase() + data.nome?.slice(1)}
          </span> 
        </div> 
        
        <div className="functionButtons-desktop"> 
          <button 
            className="material-symbols-outlined action-desktop" 
            onClick={(ev) => {
              ev.stopPropagation();
              handleDelete();
            }}
          >
            delete
          </button> 
          <button 
            className="material-symbols-outlined action-desktop" 
            onClick={handleEdit}
          >
            edit
          </button> 
        </div> 
      </div> 
    </>
  ) 
}