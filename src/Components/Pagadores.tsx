import React, { useEffect, useState } from "react"
import { api } from "../lib/axios"

export const Pagadores = () => {
  const [values, setValues] = useState({
    nome_completo: "",
    email: "",
    numero_documento: "",
    telefone: ""
  })
  const [pagadores, setPagadores] = useState<any[]>([])

  useEffect(() => {
    api.get("/pagadores").then((response) => setPagadores(response.data))
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
      .post("/pagadores", {
        ...values
      })
      .then((response) => setPagadores([...pagadores, response.data]))
  }

  return (
    <div>
      <div style={{ margin: "20px 0" }}>
        <h1>Pagadores</h1>

        <h2>Formulario</h2>
        <form>
          <input
            type="text"
            name="nome_completo"
            placeholder="nome_completo"
            value={values.nome_completo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            value={values.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="numero_documento"
            placeholder="numero_documento"
            value={values.numero_documento}
            onChange={handleChange}
          />
          <input
            type="text"
            name="telefone"
            placeholder="telefone"
            value={values.telefone}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Cadastrar</button>
        </form>

        <h2>Visualizacao</h2>
        {pagadores.map((pagador) => (
          <React.Fragment key={pagador.id}>
            <hr />
            <div>
              <p>id: {pagador.id}</p>
              <p>nome_completo: {pagador.nome_completo}</p>
              <p>email: {pagador.email}</p>
              <p>numero_documento: {pagador.numero_documento}</p>
              <p>telefone: {pagador.telefone}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
