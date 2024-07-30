function calcularDistancia(pontoA, pontoB) {
    const latA = pontoA.latitude;
    const lonA = pontoA.longitude;
    const latB = pontoB.latitude;
    const lonB = pontoB.longitude;
    const R = 6371e3; // metros
    const φ1 = latA * Math.PI / 180;
    const φ2 = latB * Math.PI / 180;
    const Δφ = (latB - latA) * Math.PI / 180;
    const Δλ = (lonB - lonA) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distancia = R * c;
    return distancia;
}

function calcularMelhorRota(rota, pedidos) {
    const pontoInicial = rota.pontos[0];
    return pedidos.map(pedido => ({
        ...pedido,
        distancia: calcularDistancia(pontoInicial, pedido.endereco)
    })).sort((a, b) => a.distancia - b.distancia);
}

module.exports = { calcularDistancia, calcularMelhorRota };
