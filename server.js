import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import mysql from 'mysql';

const app = express();
const upload = multer();

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'teste',
});

connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados: ', error);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  }
});

// Configuração do middleware para análise de corpo da requisição
app.use(bodyParser.json());

// Definição das rotas
app.get('/pagamentos', (req, res) => {
  connection.query('SELECT * FROM pagamentos', (error, results) => {
    if (error) {
      console.error('Erro ao obter pagamentos: ', error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

app.get('/pagadores', (req, res) => {
  connection.query('SELECT * FROM pagadores', (error, results) => {
    if (error) {
      console.error('Erro ao obter pagadores: ', error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

app.get('/unidades', (req, res) => {
  connection.query('SELECT * FROM unidades', (error, results) => {
    if (error) {
      console.error('Erro ao obter unidades: ', error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

app.post('/pagamentos', upload.none(), (req, res) => {
  const {
    pagador_id,
    data_pagamento,
    comprovante,
    ano_referencia,
    mes_referencia,
    unidade_id,
  } = req.body;

  const query = `
    INSERT INTO pagamentos (pagador_id, data_pagamento, comprovante, ano_referencia, mes_referencia, unidade_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [
      pagador_id,
      data_pagamento,
      comprovante,
      ano_referencia,
      mes_referencia,
      unidade_id,
    ],
    (error, result) => {
      if (error) {
        console.error('Erro ao inserir pagamento: ', error);
        res.sendStatus(500);
      } else {
        const insertedId = result.insertId; // Obtém o ID inserido no banco de dados

        // Consulta os dados do pagamento recém-criado no banco de dados
        connection.query(
          'SELECT * FROM pagamentos WHERE id = ?',
          [insertedId],
          (error, results) => {
            if (error) {
              console.error('Erro ao obter dados do pagamento: ', error);
              res.sendStatus(500);
            } else {
              const pagamento = results[0]; // Assume que haverá apenas um resultado

              res.status(201).json(pagamento); // Retorna o JSON com os dados do pagamento
            }
          }
        );
      }
    }
  );
});

app.post('/pagadores', upload.none(), (req, res) => {
  const { nome_completo, email, numero_documento, telefone } = req.body;

  const query = `
    INSERT INTO pagadores (nome_completo, email, numero_documento, telefone)
    VALUES (?, ?, ?, ?)
  `;

  connection.query(
    query,
    [nome_completo, email, numero_documento, telefone],
    (error, result) => {
      if (error) {
        console.error('Erro ao inserir pagador: ', error);
        res.sendStatus(500);
      } else {
        const insertedId = result.insertId; // Obtém o ID inserido no banco de dados

        // Consulta os dados do pagador recém-criado no banco de dados
        connection.query(
          'SELECT * FROM pagadores WHERE id = ?',
          [insertedId],
          (error, results) => {
            if (error) {
              console.error('Erro ao obter dados do pagador: ', error);
              res.sendStatus(500);
            } else {
              const pagador = results[0]; // Assume que haverá apenas um resultado

              res.status(201).json(pagador); // Retorna o JSON com os dados do pagador
            }
          }
        );
      }
    }
  );
});

app.post('/unidades', upload.none(), (req, res) => {
  const { numero_identificador, localizacao } = req.body;

  const query = `
    INSERT INTO unidades (numero_identificador, localizacao)
    VALUES (?, ?)
  `;

  connection.query(
    query,
    [numero_identificador, localizacao],
    (error, result) => {
      if (error) {
        console.error('Erro ao inserir unidade: ', error);
        res.sendStatus(500);
      } else {
        const insertedId = result.insertId; // Obtém o ID inserido no banco de dados

        // Consulta os dados da unidade recém-criada no banco de dados
        connection.query(
          'SELECT * FROM unidades WHERE id = ?',
          [insertedId],
          (error, results) => {
            if (error) {
              console.error('Erro ao obter dados da unidade: ', error);
              res.sendStatus(500);
            } else {
              const unidade = results[0]; // Assume que haverá apenas um resultado

              res.status(201).json(unidade); // Retorna o JSON com os dados da unidade
            }
          }
        );
      }
    }
  );
});

// Inicialização do servidor
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor iniciado na porta http://localhost:${port}/`);
});
