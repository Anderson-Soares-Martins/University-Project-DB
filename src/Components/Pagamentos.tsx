import React, { useEffect, useState } from "react"
import { api } from "../lib/axios"

// pagador_id: 1,
//     data_pagamento: "",
//     comprovante: "",
//     ano_referencia: 2023,
//     mes_referencia: 6,
//     unidade_id: 1

export const Pagamentos = () => {
  const [values, setValues] = useState({
    pagador_id: "",
    data_pagamento: "",
    comprovante: "",
    ano_referencia: "",
    mes_referencia: "",
    unidade_id: ""
  })
  const [pagadores, setPagadores] = useState<any[]>([])

  useEffect(() => {
    api.get("/pagamentos").then((response) => setPagadores(response.data))
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
      .post("/pagamentos", {
        ...values,
        pagador_id: Number(values.pagador_id),
        ano_referencia: Number(values.ano_referencia),
        mes_referencia: Number(values.mes_referencia),
        unidade_id: Number(values.unidade_id),
        comprovante: "base64-encoded-data"
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
            name="pagador_id"
            placeholder="pagador_id"
            value={values.pagador_id}
            onChange={handleChange}
          />
          <input
            type="date"
            name="data_pagamento"
            placeholder="data_pagamento"
            value={values.data_pagamento}
            onChange={handleChange}
          />
          {/* <input
            type="text"
            name="comprovante"
            placeholder="comprovante"
            value={values.comprovante}
            onChange={handleChange}
          /> */}
          <input
            type="text"
            name="ano_referencia"
            placeholder="ano_referencia"
            value={values.ano_referencia}
            onChange={handleChange}
          />
          <input
            type="text"
            name="mes_referencia"
            placeholder="mes_referencia"
            value={values.mes_referencia}
            onChange={handleChange}
          />
          <input
            type="text"
            name="unidade_id"
            placeholder="unidade_id"
            value={values.unidade_id}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Cadastrar</button>
        </form>

        <h2>Visualizacao</h2>
        {pagadores.map((pagamento) => (
          <React.Fragment key={pagamento.id}>
            <hr />
            <div>
              <p>pagador_id: {pagamento.pagador_id}</p>
              <p>data_pagamento: {pagamento.data_pagamento}</p>

              <p>ano_referencia: {pagamento.ano_referencia}</p>
              <p>mes_referencia: {pagamento.mes_referencia}</p>
              <p>unidade_id: {pagamento.unidade_id}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
