import './App.css'

function App() {
  const handlesubmit = (ev) => {
    ev.preventDefault();

    const form = document.querySelector('#form-env');
    const data = new FormData(form);

    let objData = {};  

    for (const pair of data.entries()) {
      const key = pair[0];
      const value = pair[1];

      objData = {
        ...objData,
        [key]: value
      }
    }

    fetch('https://lab-system-backend.onrender.com/employee/register', {
      method: "post",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(objData),
    })
      .then(response => {
        if (response.ok) {
          console.log("Tudo certo");
        }
      })
  }

  return (
    <>
      <form id='form-env' onSubmit={handlesubmit}>
        <div>
          <label htmlFor="registration">Matricula</label><br />
          <input type="text" name="registration" id="registration" />
        </div>

        <div>
          <label htmlFor="name">Nome</label><br />
          <input type="text" name="name" id="name" />
        </div>

        <div>
          <label htmlFor="lastName">Sobrenome</label><br />
          <input type="text" name="lastName" id="lastName" />
        </div>

        <div>
          <label>Turno</label> <br />
          <label htmlFor="shiftA">A</label>
          <input type="radio" name="shift" id="shiftA" value="A"/>
          <label htmlFor="shiftB">B</label>
          <input type="radio" name="shift" id="shiftB"  value="B"/>          
          <label htmlFor="shiftC">C</label>
          <input type="radio" name="shift" id="shiftC"  value="C"/>
        </div>

        <div>
          <label htmlFor="phoneNumber">Número de Telefone</label><br />
          <input type="tel" name="phoneNumber" id="phoneNumber"/>
        </div>

        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </>
  )
}

export default App
