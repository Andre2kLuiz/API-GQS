const express = require('express');
const router = express.Router();

// Lista de pedidos simulada
let listaDePedidos = [
    { id: 1, item: 'Pizza', quantidade: 2 },
    { id: 2, item: 'Hamburguer', quantidade: 1 },
    { id: 3, item: 'Refrigerante', quantidade: 3 }
];

// Rota GET /pedidos
router.get('/', (req, res) => {
    res.json(listaDePedidos);
});

// Rota POST /pedidos
router.post('/', (req, res) => {
    const novoPedido = req.body;
    novoPedido.id = listaDePedidos.length + 1; // Gera um ID simples para o novo pedido
    listaDePedidos.push(novoPedido);
    res.status(201).json(novoPedido);
});

module.exports = router;
