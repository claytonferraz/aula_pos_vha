import "reflect-metadata";
require('dotenv').config();
import { body, validationResult } from 'express-validator';
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT;


app.use(bodyParser.json());
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

app.post('/new-user',
  [
    body('email').isEmail().withMessage("O e-mail precisa ser válido"),
    body('email').custom(value => {
      if (!value) {
        return Promise.reject('E-mail é obrigatório');
      }
      if (value == "teste@teste.com") {
        return Promise.reject('E-mail já cadastrado');
      }
      return true
    }),
    body('name').isLength({ min: 3 }).withMessage("Campo precisa ter pelo menos 3 caracteres"),
    body('password').isLength({ min: 8 }).withMessage("Campo senha precisa ter pelo menos 8 caracteres"),
    body('age').isNumeric().withMessage("Idade precisa ser um número")
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send({ message: 'Tudo válido' })
  });

app.listen(port, () => {
  console.log(`Exemplo de app no porta  ${port}`)
});