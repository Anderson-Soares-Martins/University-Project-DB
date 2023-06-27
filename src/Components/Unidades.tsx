import { useEffect, useState } from "react"
import { api } from "../lib/axios"

export const Unidades = () => {
  const [values, setValues] = useState({
    numero_identificador: "",
    localizacao: ""
  })
  const [unidades, setUnidades] = useState<any[]>([])

  useEffect(() => {
    api.get("/unidades").then((response) => setUnidades(response.data))
  }, [])

  const handleChange = (e: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }))
  }

  const handleClick = (e: any) => {
    e.preventDefault()
    api
      .post("/unidades", {
        ...values
      })
      .then((response) => setUnidades([...unidades, response.data]))
  }

  return (
    <div>
      <h1>Pagementos</h1>

      <div style={{ margin: "20px 0" }}>
        <h1>Unidade</h1>

        <h2>Formulario</h2>
        <form>
          <input
            type="text"
            name="numero_identificador"
            placeholder="numero_identificador"
            value={values.numero_identificador}
            onChange={handleChange}
          />
          <input
            type="text"
            name="localizacao"
            placeholder="localizacao"
            value={values.localizacao}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Cadastrar</button>
        </form>

        <h2>Visualizacao</h2>
        {unidades.map((unidade) => (
          <>
            <hr />
            <div key={unidade.numero_identificador}>
              <p>{unidade.numero_identificador}</p>
              <p>{unidade.localizacao}</p>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
