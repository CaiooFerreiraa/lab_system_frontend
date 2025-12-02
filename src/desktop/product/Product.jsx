import { useState, useEffect } from "react";
import Card from "./_components/Card";
import Load from "./_components/Load";

export default function Product({search}) {
  const [product, setProduct] = useState([]);
  const host = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const fetchProductFromApi = () => {
    setLoading(true)
    fetch(`${host}/product/read`)
      .then((response) => response.json())
      .then((dataproducts) => {
        setProduct(dataproducts)
      })
      .catch((err) => console.error("Houve um error: ", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProductFromApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <>
      {loading && <Load />}
      <div className="main-card">
        <Card elemets={product} search={search} onRefresh={fetchProductFromApi}/>
      </div>
    </>
  )
}