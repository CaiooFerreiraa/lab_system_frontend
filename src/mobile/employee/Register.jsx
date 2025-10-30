import { useState } from "react";
import { useParams } from "react-router-dom";
import Form from "./_components/Form";
import Load from "./_components/Load";
import PopUp from "./_components/PopUp";

export default function Register() {
  const host = import.meta.env.VITE_API_URL;
  const { registration } = useParams(); // caso precise futuramente
  const [user, setUser] = useState({});
  const [shift, setShift] = useState("");
  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const newUser = { ...user, shift };
    setLoading(true);

    try {
      const res = await fetch(`${host}/employee/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg(data.msg || "Funcionário registrado com sucesso!");
      } else {
        setMsg(data.msg || "Erro ao registrar funcionário.");
      }
      setPopUp(true);
    } catch (err) {
      console.error(err);
      setMsg("Falha na conexão com o servidor.");
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
          <h1 className="tittle">Registrar Funcionário</h1>
        </header>

        <section className="register-section">
          <div className="formMain">
            <div className="form-container">
              <Form
                user={user}
                handleChange={handleChange}
                handleFunction={handleRegister}
                registration={registration}
                shift={shift}
                setShift={setShift}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
