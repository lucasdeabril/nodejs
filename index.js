const http = require('http');
const PORT = 3000;
const routes = express.Router()

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!');
});

routes.get('/', (req, res) => {
  return res.json(db);
  });

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
