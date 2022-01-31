const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

app.post('/accounts', (request, response) => {
  const { cpf, name } = request.body;

  const account = {
    id: uuid(),
    cpf,
    name,
    statement: []
  }
  
  customers.push(account);

  return response.status(201).json(account);
});

app.listen(3333, () => {
  console.log('🚀 Server started on http://localhost:3333')
});
