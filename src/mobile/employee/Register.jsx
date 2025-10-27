import { useState } from "react";
import { useParams } from "react-router-dom";
import Form from "./_components/Form";

export default function Register() {
  const host = import.meta.env.VITE_API_URL
  const { registration } = useParams();
  const [user, setUser] = useState({});
  const [shift, setShift] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (event) => {
    event.preventDefault();
    user.shift = shift;
    fetch(`${host}/employee/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(response => {  if (response.ok) alert("Funcionário cadastrado com sucesso")})
      .catch((err) => console.error("Houve um erro: " + err));
  };

  return (
    <>
      <h1 className="tittle">Registrar Funcionário</h1>
      <div className="formMain">
        <Form          
          user={user} 
          handleChange={handleChange} 
          handleFunction={handleRegister}
          registration={registration}
          shift={shift}
          setShift={setShift}
        />
      </div>
    </>
  );
}
