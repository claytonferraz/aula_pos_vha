import "reflect-metadata";
require('dotenv').config();
import { body, validationResult } from 'express-validator';
const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/user', (req, res) => {
  res.send('Olá Usuario!')
});

app.post('/user', [
  //validação dos dados
  body('username').isEmail(),
  body('password').isLength({ min: 5 })
], (req, res) => {
  // caso encontre erros, ficará nessa variável errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //se os dados forem válidos, o sistema executará aqui
});

app.listen(port, () => {
  console.log(`Exemplo de app no porta  ${port}`)
});