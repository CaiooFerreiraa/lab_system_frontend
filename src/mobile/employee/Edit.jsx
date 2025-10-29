import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from "./_components/Form";
import Load from "./_components/Load";
import PopUp from "./_components/PopUp";

export default function Edit() {
  const hostDeployment = import.meta.env.VITE_API_URL;
  const { registration } = useParams();

  const [user, setUser] = useState({});
  const [shift, setShift] = useState();
  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [msg, setMsg] = useState("");

  // 🔹 Função separada para buscar o funcionário
  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${hostDeployment}/employee/resgater/${registration}`);
      if (!res.ok) throw new Error("Erro ao buscar funcionário");
      const data = await res.json();

      setUser({
        registration: data.matricula,
        name: data.nome,
        lastName: data.sobrenome,
        shift: data.turno,
        phoneNumber: data.telefone,
      });

      setShift(data.turno);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registration]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Editar funcionário
  const handleEdit = async (event) => {
    event.preventDefault();

    if (!confirm("Deseja atualizar esse funcionário?")) return;

    setLoading(true);
    const updatedUser = { ...user, shift };

    try {
      const res = await fetch(`${hostDeployment}/employee/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      const response = await res.json();

      setMsg(response.msg || "Erro inesperado");
      setPopUp(true);
    } catch (err) {
      console.error(err);
      setMsg("Falha na atualização");
      setPopUp(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Load />}
      {popUp && <PopUp msg={msg} setPopUp={setPopUp} />}

      <h1 className="tittle">Editar Funcionário</h1>
      <div className="formMain">
        <Form
          user={user}
          handleChange={handleChange}
          handleFunction={handleEdit}
          registration={registration}
          shift={shift}
          setShift={setShift}
        />
      </div>
    </>
  );
}
