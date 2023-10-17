export const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})

export const formatValue = (value: string) => {
    // Remove tudo que não for dígito ou ponto decimal
    value = value.replace(/[^0-9.]/g, '');

    // Remove pontos extras e garante que haja no máximo uma casa decimal
    const parts = value.split('.');
    if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].slice(0, 2);
    }
    value = parts.join('.');

    // Formata o valor em dólar
    if (value) {
        value = parseFloat(value).toFixed(0);
    }

    return value;
};