// const http = require('http');
// const PORT = 3000;
// const express = require('express')
// const routes = express.Router()

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello Wooooooorld!');
//   return req.body;
// });

// routes.get('/teste', (req, res) => {
//   const body = req.body
//   if(!body)
//     return res.status(400).end();
  
//   return res.json(body);
// });

// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}/`);
// });

const express = require('express');
const app = express(); // Cria uma aplicação Express

const PORT = 3000;

// Middleware para analisar dados JSON recebidos
app.use(express.json());

// Rota para o endpoint raiz
app.get('/', (req, res) => {
  res.status(200).send('Se você está lendo isso, significa que estou melhorando no backend');
});

// Rota para o endpoint '/teste'
app.post('/teste', (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).end();
  }
  return res.json(body);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});

