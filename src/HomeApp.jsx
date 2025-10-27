import { Link } from "react-router-dom"

export default function HomeApp() {
  return (
    <>
      <Link to={"/employee"}>Funcionários</Link><br />
      <Link to={"/mark"}>Marcas</Link>
    </>
  )
}