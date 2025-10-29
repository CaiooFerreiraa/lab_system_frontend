import { Link } from "react-router-dom"

export default function Form({ user, handleFunction, handleChange, registration, shift, setShift }) {
  return (
    <>
      <div>
        <form id="formRegister" onSubmit={handleFunction}>
          <div className="labelForm">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user.name}
              onChange={handleChange}
            />
          </div>

          <div className="labelForm">
            <label htmlFor="lastName">Sobrenome:</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              defaultValue={user.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="labelForm">
            <label htmlFor="registration">Matrícula</label>
            <input
              type="text"
              name="registration"
              id="registration"
              defaultValue={registration}
              onChange={handleChange}
            />
          </div>

          <div className="labelForm shifts">
            <label htmlFor="shiftA">Turno A</label>
            <input
              type="radio"
              name="shift"
              id="shiftA"
              defaultValue="Turno A"
              checked={shift === "Turno A"}
              onChange={(e) => {
                setShift(e.target.value)
              }}
            />
            <label htmlFor="shiftB">Turno B</label>
            <input
              type="radio"
              name="shift"
              id="shiftB"
              defaultValue="Turno B"
              checked={shift === "Turno B"}
              onChange={(e) => {
                setShift(e.target.value)
              }}
            />
            <label htmlFor="shiftC">Turno C</label>
            <input
              type="radio"
              name="shift"
              id="shiftC"
              defaultValue="Turno C"
              checked={shift === "Turno C"}
              onChange={(e) => {
                setShift(e.target.value)
              }}
            />
          </div>

          <div className="labelForm">
            <label htmlFor="phoneNumber">Telefone:</label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              defaultValue={user.phoneNumber}
              onChange={handleChange}
            />
          </div>

          
          <div className="but">
            <button type="submit" id="subButton">Enviar</button>
            <Link to="/employee" className="material-symbols-outlined arrow-back">
              arrow_back
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}