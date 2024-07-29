const express = require('express');
const router = express.Router();

// Lista de rotas simulada
let listaDeRotas = [
    { id: 1, nome: 'Rota 1', pontos: ['A', 'B', 'C'] },
    { id: 2, nome: 'Rota 2', pontos: ['D', 'E', 'F'] }
];

// Rota GET /rotas
router.get('/', (req, res) => {
    res.json(listaDeRotas);
});

// Rota POST /rotas
router.post('/', (req, res) => {
    const novaRota = req.body;
    novaRota.id = listaDeRotas.length + 1; // Gera um ID simples para a nova rota
    listaDeRotas.push(novaRota);
    res.status(201).json(novaRota);
});

// Rota GET /melhor-rota/:id
router.get('/melhor-rota/:id', (req, res) => {
    const rotaId = parseInt(req.params.id);
    const rota = listaDeRotas.find(r => r.id === rotaId);

    if (!rota) {
        return res.status(404).json({ error: 'Rota não encontrada' });
    }

    // Simulação de lógica para determinar a melhor rota
    // Aqui você pode implementar a lógica real para determinar a melhor rota com base nos pedidos
    const melhorRota = {
        id: rota.id,
        nome: rota.nome,
        pontos: rota.pontos,
        // Adicione lógica adicional conforme necessário
    };

    res.json(melhorRota);
});

module.exports = router;
