import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Form from "./_components/Form";
import Header from './_components/Header'

export default function Edit() {
  const hostDeployment = import.meta.env.VITE_API_URL;
  const { registration } = useParams();
  const [user, setUser] = useState({});
  const [shift, setShift] = useState();
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetch(`${hostDeployment}/employee/resgater/${registration}`)
      .then((res) => res.json())
      .then((employeeData) => {
        setUser({
          registration: employeeData.matricula,
          name: employeeData.nome,
          lastName: employeeData.sobrenome,
          shift: employeeData.turno,
          phoneNumber: employeeData.telefone
        })
      })
      .catch((err) => console.error("Houve um erro: " + err));
  }, [registration, hostDeployment]);

  useEffect(() => {
    if (user.shift) setShift(user.shift);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (event) => {
    event.preventDefault();
    if(!confirm("Deseja atualizar esse funcionário?")) return
    fetch(`${hostDeployment}/employee/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(() => {
        alert("Funcionário Atualizado")
      })
      .catch((err) => console.error("Houve um erro: " + err));
  };

  return (
    <>
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