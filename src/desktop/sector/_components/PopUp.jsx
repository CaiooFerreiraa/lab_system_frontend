export default function PopUp({msg, setPopUp}) {
  const handleClosePopUp = () => {
    setPopUp(prev => !prev);
  }

  return (
    <>
      <div className="popUpContainer">
        <div className="popUp">
          <button type="button" className="material-symbols-outlined closed" onClick={handleClosePopUp}>
            close
          </button>
            {msg}
        </div>
      </div>
    </>
  )
}