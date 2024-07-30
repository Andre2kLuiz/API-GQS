const request = require('supertest');
const app = require('../index');

beforeAll((done) => {
    const PORT = 3001; // Use uma porta diferente para os testes
    server = app.listen(PORT, () => {
        global.agent = request.agent(server);
        done();
    });
});

afterAll((done) => {
    server.close(done);
});

describe('API Endpoints', () => {
    let rotas = [];
    let pedidos = [];

    beforeAll(() => {
        rotas = [];
        pedidos = [];
    });

    it('GET /pedidos - Retorna uma lista de pedidos', async () => {
        const res = await request(app).get('/pedidos');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /pedidos - Cria um novo pedido', async () => {
        const newPedido = {
            endereco: {
                latitude: -23.550520,
                longitude: -46.633308
            },
            produto: 'Produto A',
            quantidade: 10
        };
        const res = await request(app).post('/pedidos').send(newPedido);
        expect(res.statusCode).toEqual(201);
        expect(res.body.endereco.latitude).toEqual(newPedido.endereco.latitude);
        expect(res.body.endereco.longitude).toEqual(newPedido.endereco.longitude);
        expect(res.body.produto).toEqual(newPedido.produto);
        expect(res.body.quantidade).toEqual(newPedido.quantidade);
        pedidos.push(newPedido);
    });

    it('GET /rotas - Retorna uma lista de rotas', async () => {
        const res = await request(app).get('/rotas');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /rotas - Cria uma nova rota', async () => {
        const newRota = {
            latitude: -23.550520,
            longitude: -46.633308
        };
        const res = await request(app).post('/rotas').send(newRota);
        expect(res.statusCode).toEqual(201);
        expect(Array.isArray(res.body.pontos)).toBe(true);
        expect(res.body.pontos.length).toEqual(1);
        expect(res.body.pontos[0].latitude).toEqual(newRota.latitude);
        expect(res.body.pontos[0].longitude).toEqual(newRota.longitude);
        rotas.push(newRota);
    });

    it('GET /melhor-rota/:index - Retorna a melhor rota de entrega', async () => {
        const newRota = {
            latitude: -23.550520,
            longitude: -46.633308
        };
        const rotaRes = await request(app).post('/rotas').send(newRota);
        const rotaIndex = rotas.length - 1; // Última rota adicionada

        const newPedido = {
            endereco: {
                latitude: -23.551520,
                longitude: -46.634308
            },
            produto: 'Produto A',
            quantidade: 10
        };
        await request(app).post('/pedidos').send(newPedido);

        const res = await request(app).get(`/melhor-rota/${rotaIndex}`);
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0]).toHaveProperty('endereco');
    });
});
