
export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const dateFormatter = (date: Date) => {
  const diasSemana = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

  // Data recebida do backend
  const dataRecebida = new Date(date);

  // Obtenha o dia da semana, o dia do mês e o mês
  const diaSemana = diasSemana[dataRecebida.getUTCDay()];
  const dia = dataRecebida.getUTCDate();
  const mes = meses[dataRecebida.getUTCMonth()];
  const ano = dataRecebida.getUTCFullYear();

  // Crie a string formatada
    const dataFormatada = `${diaSemana.slice(0, 3)} ${dia} ${mes} ${ano}`;
    return dataFormatada
}

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
