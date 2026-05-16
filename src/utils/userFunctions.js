import {getDatabase, ref, push, update, increment} from 'firebase/database';

/**
 * Envia um pedido de música para o Firebase Realtime Database e atualiza o contador de pedidos do dia.
 *
 * @param {string} banda - Nome da banda ou cantor (substituído por '-' se vazio).
 * @param {string} musica - Nome da música (substituído por '-' se vazio).
 * @param {string} nomeCliente - Nome do cliente que fez o pedido.
 * @param {string} sobrenomeCliente - Sobrenome do cliente.
 * @param {string} dbPath - Caminho base no Realtime Database (ex: "UF/Cidade/Estabelecimento").
 * @param {string} listaData - Data da lista de pedidos, usada para o contador diário.
 * *
 * @return {void}
 */
export function enviarPedido(banda, musica, nomeCliente, sobrenomeCliente, dbPath, listaData) {
  // Substitui valores vazios por '-'
  if (banda === '') {
    banda = '-';
  }
  if (musica === '') {
    musica = '-';
  }

  // Cria o objeto de pedido
  const pedido = {
    ativo: true,
    ocioso: false,
    removido: false,
    horaPedido: new Date().toLocaleTimeString(),
    banda: banda,
    musica: musica,
    nomeCliente: `${nomeCliente} ${sobrenomeCliente}`,
  };

  const db = getDatabase();

  // Adiciona o pedido à lista de pedidos
  push(ref(db, `${dbPath}/Lista`), pedido);

  // Atualiza o contador de pedidos do dia (formato 'YYYY-MM-DD')
  const updates = {
    [`${dbPath}/Contadores/${new Date(listaData).toLocaleDateString('en-CA')}/Total`]: increment(1),
  };
  update(ref(db), updates);
}
