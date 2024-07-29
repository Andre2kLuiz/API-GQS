const express = require('express');
const pedidos = require('./pedidos');
const rotas = require('./rotas');

const app = express();
const port = 3000;

// Middleware para processar JSON
app.use(express.json());

app.use('/pedidos', pedidos);
app.use('/rotas', rotas);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
