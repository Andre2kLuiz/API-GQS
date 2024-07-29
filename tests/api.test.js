const request = require('supertest');
const express = require('express');
const pedidos = require('../pedidos');
const rotas = require('../rotas');

const app = express();
app.use(express.json());
app.use('/pedidos', pedidos);
app.use('/rotas', rotas);

describe('API Endpoints', () => {
    it('GET /pedidos - Deve retornar a lista de pedidos', async () => {
        const res = await request(app).get('/pedidos');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('POST /pedidos - Deve criar um novo pedido', async () => {
        const novoPedido = { item: 'Salada', quantidade: 1 };
        const res = await request(app).post('/pedidos').send(novoPedido);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.item).toEqual('Salada');
        expect(res.body.quantidade).toEqual(1);
    });

    it('GET /rotas - Deve retornar a lista de rotas', async () => {
        const res = await request(app).get('/rotas');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it('POST /rotas - Deve criar uma nova rota', async () => {
        const novaRota = { nome: 'Rota 3', pontos: ['G', 'H', 'I'] };
        const res = await request(app).post('/rotas').send(novaRota);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.nome).toEqual('Rota 3');
        expect(res.body.pontos).toEqual(['G', 'H', 'I']);
    });

    it('GET /melhor-rota/:id - Deve retornar a melhor rota de entrega', async () => {
        const res = await request(app).get('/rotas/melhor-rota/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('nome');
        expect(res.body).toHaveProperty('pontos');
    });
});
