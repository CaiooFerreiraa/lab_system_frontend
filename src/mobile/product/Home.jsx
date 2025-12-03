import MainPageProduct from './_components/MainPageProduct'
import Header from './_components/Header'
import { useState, useEffect } from "react"

export default function Home() {
  const [dataProduct, setDataProduct] = useState([])
  const host = import.meta.env.VITE_API_URL
  const [search, setSearch] = useState();

  const fetchProductFromApi = () => {
    fetch(`${host}/product/read`, {method: "get"})
      .then(response => response.json())
      .then(dataProduct => {
        setDataProduct(dataProduct)
      })
      .catch(err => console.error("Houve um erro: " + err))
  }

    useEffect(() => {
      fetchProductFromApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <>
      <main className="main">
            {/* Cabeçalho fixo/topo */}
            <header className="home-header">
              <Header tittle={"Produtos"} setSearch={setSearch} />
            </header>
      
            {/* Container principal centralizado */}
            <section className="home-content">
              <div className="content-wrapper">
                <MainPageProduct
                  products={dataProduct}
                  search={search}
                  onRefresh={fetchProductFromApi}
                />
              </div>
            </section>
          </main>
    </>
  )
}