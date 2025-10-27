import MainCardMark from "./_components/MainCardMark"
import Header from './_components/Header'
import { useState, useEffect } from "react"

export default function Home() {
  const [dataMarks, setDataMarks] = useState([])
  const host = import.meta.env.VITE_API_URL
  const [search, setSearch] = useState();

  const fetchMarkFromApi = () => {
    fetch(`${host}/mark/view`)
      .then(response => response.json())
      .then(dataMarks => setDataMarks(dataMarks))
      .catch(err => console.error("Houve um erro: " + err))
  }

    useEffect(() => {
      fetchMarkFromApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <>
      <div className='main'>
        <Header tittle={"Marcas"} setSearch={setSearch}/>
        <MainCardMark dataMarks={dataMarks} fetchMarkFromApi={fetchMarkFromApi} search={search}/>
      </div>
    </>
  )
}