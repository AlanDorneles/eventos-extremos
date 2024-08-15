import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

// Convertendo __dirname para trabalhar com módulos ES
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware para servir os arquivos estáticos da build do Vite
app.use(express.static(path.join(__dirname, 'dist')));

// Importando o arquivo CSS do Bulma
app.use('/bulma', express.static(path.join(__dirname, 'node_modules/bulma/css')));
// Importando a pasta public
app.use('/public', express.static(path.join(__dirname, 'public')));

// Rota para capturar todas as outras requisições e servir o index.html
// Removendo 'req' não utilizado para evitar o aviso
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
