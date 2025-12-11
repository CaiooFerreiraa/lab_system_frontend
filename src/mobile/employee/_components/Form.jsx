import { Link } from "react-router-dom";

export default function Form({
  user,
  handleFunction,
  handleChange,
  registration,
  shift,
  setShift,
}) {
  return (
    <section className="form-section">
      <form id="formRegister" onSubmit={handleFunction} className="form-employee">
        {/* 🔹 Nome e Sobrenome */}
        <div className="form-row">
          <div className="labelForm">
            <label htmlFor="name">Nome:*</label>
            <input
              required
              pattern="[^/]*"
              title="Não pode conter /"
              type="text"
              name="name"
              id="name"
              defaultValue={user.name}
              onChange={handleChange}
            />
          </div>

          <div className="labelForm">
            <label htmlFor="lastName">Sobrenome:*</label>
            <input
              pattern="[^/]*"
              title="Não pode conter /"
              type="text"
              name="lastName"
              id="lastName"
              required
              defaultValue={user.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* 🔹 Matrícula */}
        <div className="labelForm">
          <label htmlFor="registration">Matrícula*</label>
          <input
            required
            type="text"
            name="registration"
            id="registration"
            defaultValue={registration}
            onChange={(e) => {
              if (e.target.value.includes('/')) alert("A matícula não pode conter barra")
              const value = e.target.value.replace(/\//g, ""); // remove "/"
              handleChange({ target: { name: "registration", value } });
            }}
            title="Não pode conter /"
          />
        </div>

        {/* 🔹 Turnos (A, B, C) */}
        <fieldset className="labelForm shifts">
          <div className="shift-options">
            <input
              type="radio"
              name="shift"
              id="shiftA"
              defaultValue="Turno A"
              checked={shift === "Turno A"}
              onChange={(e) => setShift(e.target.value)}
            />
            <label htmlFor="shiftA">
              Turno A
            </label>

            <input

              type="radio"
              name="shift"
              id="shiftB"
              defaultValue="Turno B"
              checked={shift === "Turno B"}
              onChange={(e) => setShift(e.target.value)}
            />
            <label htmlFor="shiftB">
              Turno B
            </label>

            <input
              type="radio"
              name="shift"
              id="shiftC"
              defaultValue="Turno C"
              checked={shift === "Turno C"}
              onChange={(e) => setShift(e.target.value)}
            />
            <label htmlFor="shiftC">
              Turno C
            </label>
          </div>
        </fieldset>

        {/* 🔹 Telefone */}
        <div className="labelForm">
          <label htmlFor="phoneNumber">Telefone:*</label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            defaultValue={user.phoneNumber}
            onChange={handleChange}
          />
        </div>

        {/* 🔹 Botões */}
        <div className="but">
          <Link to="/employee" className="material-symbols-outlined arrow-back">
            arrow_back
          </Link>
          <button type="submit" id="subButton">
            {user.name ? 'Atualizar' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </section>
  );
}
