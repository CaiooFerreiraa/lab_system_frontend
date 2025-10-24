import Header from "./_components/Header.jsx"
import MainCard from "./_components/MainPageEmployee.jsx"

export default function Home() {
  return (
    <>
      <div className='main'>
        <Header tittle={"Funcionários" }/>
        <MainCard />
      </div>
    </>

  )
}