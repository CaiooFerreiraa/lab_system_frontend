import MainCard from "./_components/MainCardMark"
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
      <main className="main">
            {/* Cabeçalho fixo/topo */}
            <header className="home-header">
              <Header tittle={"Marcas"} setSearch={setSearch} />
            </header>
      
            {/* Container principal centralizado */}
            <section className="home-content">
              <div className="content-wrapper">
                <MainCard
                  dataMarks={dataMarks}
                  search={search}
                  onRefresh={fetchMarkFromApi}
                />
              </div>
            </section>
          </main>
    </>
  )
}