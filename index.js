const dbp = 'pscale_pw_qPEbqcsiOet2jNx'
const dbw = 'kUjLjN5D8agtddD66zR2VeA7NwEA'
const dburl= new URL(`mysql://5rcqhc25mjeyasrovykd:${dbp}${dbw}@aws.connect.psdb.cloud/primeiro_banco?ssl={"rejectUnauthorized":true}`)
const mysql = require('mysql2');
const express = require('express');
const app = express(); // Cria uma aplicação Express
const url = require('url');
const dbConfig = {
  host: dburl.hostname,
  user: dburl.username,
  password: dburl.password,
  database: dburl.pathname.substr(1),
  ssl: JSON.parse(dburl.searchParams.get('ssl')),
};
const connection = mysql.createConnection(dbConfig)
const PORT = 3000;

connection.connect((err) => {
  if(err){
    console.error('Erro ao conectar ao banco de dados', err.message);

  }else{
    console.log('Conexão bem-sucedida!');
  }
})
// Middleware para analisar dados JSON recebidos
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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

app.post('/usuarios', (req, res) => {
  const novoUsuario = req.body;
  console.log('Novo usuário:', novoUsuario);
  if (!novoUsuario || !novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha) {
    console.log('Dados do usuário incompletos')
    return res.status(400).json({ message: 'Dados do usuário incompletos' });
  }
  const query = 'INSERT INTO users (nome, email, senha, favoritos, historico) VALUES (?, ?, ?, ?,?)'
  const values = [novoUsuario.nome, novoUsuario.email, novoUsuario.senha, novoUsuario.favoritos, novoUsuario.historico];
  console.log('Query:', query);
  console.log('Values:', values);

  connection.query(query, values, (err, results) => {
    if(err){
      console.error('Erro ao criar usuário:', err.message);
    }
    return res.status(201).json({message:'Usuario criado com sucesso'});
  })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});

