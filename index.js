const dbp = 'pscale_pw_qPEbqcsiOet2jNx'
const dbw = 'kUjLjN5D8agtddD66zR2VeA7NwEA'
const dburl= new URL(`mysql://k1wxu9ixz5z1aiamm54x:${dbp}${dbw}@aws.connect.psdb.cloud/primeiro_banco?ssl={"rejectUnauthorized":true}`)
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
  if (!novoUsuario || !novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha) {
    return res.status(400).json({ message: 'Dados do usuário incompletos' });
  }
  const query = 'INSERT INTO users (nome, email, senha, favoritos, historico) VALUES (?, ?, ?, ?,?)'
  const values = [novoUsuario.nome, novoUsuario.email, novoUsuario.senha, novoUsuario.favoritos, novoUsuario.historico];

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

