import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Form from "./_components/Form";
import Header from './_components/Header'

export default function Edit() {
  const hostDeployment = import.meta.env.VITE_API_DEVELOPMENT;
  const { registration } = useParams();
  const [user, setUser] = useState({});
  const [shift, setShift] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const fetchedRef = useRef(false);

  // buscar dados
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    if (registration) {
      fetch(`${hostDeployment}/employee/resgater/${registration}`, {
        method: "POST",
      })
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
    }
  }, [registration, hostDeployment]);

  useEffect(() => {
    if (user.shift) setShift(user.shift);
  }, [user]);

  // evento de mudança genérico
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (event) => {
    event.preventDefault();
    fetch(`${hostDeployment}/employee/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          setSuccess(true)
          setError(false)
        } else {
          setError(true)
          setSuccess(false)
        };
      })
      .catch((err) => console.error("Houve um erro: " + err));
  };

  return (
    <>
      <Header tittle={"Atualizar Funcionário"}/>
      <div className="formMain">
        <Form 
          user={user} 
          handleChange={handleChange} 
          handleFunction={handleEdit}
          registration={registration}
          shift={shift}
          setShift={setShift}
          success={success}
          error={error}
        />
        <Link to="/" className="material-symbols-outlined arrow-back">
          arrow_back
        </Link>
      </div>
    </>
  );
}