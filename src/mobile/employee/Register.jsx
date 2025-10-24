import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from './_components/Header.jsx'
import Form from "./_components/Form";

export default function Register() {
  const hostDeployment = import.meta.env.VITE_API_DEVELOPMENT
  const { registration } = useParams();
  const [user, setUser] = useState({});
  const [shift, setShift] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // evento de mudança genérico
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (event) => {
    event.preventDefault();
    user.shift = shift;
    fetch(`${hostDeployment}/employee/register`, {
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
      <Header tittle={"Cadastrar Funcionários"}/>
      <div className="formMain">
        <Form          
          user={user} 
          handleChange={handleChange} 
          handleFunction={handleRegister}
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
