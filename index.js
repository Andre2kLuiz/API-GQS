const express = require('express');
const app = express();
const Pedido = require('./Pedido');
const Rota = require('./Rota');
const { calcularMelhorRota } = require('./utils');

app.use(express.json());

let pedidos = [];
let rotas = [];

// Rotas de pedidos
app.get('/pedidos', (req, res) => {
    res.json(pedidos);
});

app.post('/pedidos', (req, res) => {
    const { endereco, produto, quantidade } = req.body;
    const { latitude, longitude } = endereco;
    const novoPedido = new Pedido({ latitude, longitude }, produto, quantidade);
    pedidos.push(novoPedido);
    res.status(201).json(novoPedido);
});

// Rotas de rotas
app.get('/rotas', (req, res) => {
    res.json(rotas);
});

app.post('/rotas', (req, res) => {
    const { latitude, longitude } = req.body;
    const novaRota = new Rota(latitude, longitude);
    rotas.push(novaRota);
    res.status(201).json(novaRota);
});

// Melhor rota
app.get('/melhor-rota/:index', (req, res) => {
    const { index } = req.params;
    const rota = rotas[index];
    if (!rota) {
        return res.status(404).json({ message: 'Rota não encontrada' });
    }

    const melhorRota = calcularMelhorRota(rota, pedidos);
    res.json(melhorRota);
});

module.exports = app;
