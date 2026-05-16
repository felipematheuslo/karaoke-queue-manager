import {getDatabase, ref, remove, update, increment} from 'firebase/database';

/**
 * Abre uma nova lista de pedidos no Firebase Realtime Database, marcando-a como aberta,
 * registrando a data atual e resetando a lista anterior.
 * @param {string} dbPath - Caminho base no Realtime Database (ex: "UF/Cidade/Estabelecimento").
 * @return {Promise<void>}
 */
export async function abrirNovaLista(dbPath) {
  const db = getDatabase();
  const updates = {};

  // Marca a lista como aberta
  updates[`${dbPath}/ListaAberta`] = true;
  update(ref(db), updates);

  // Registra a data de abertura da nova lista
  updates[`${dbPath}/DataLista`] = new Date().toDateString();
  update(ref(db), updates);

  // Reseta a lista anterior removendo o nó correspondente
  await remove(ref(db, `${dbPath}/Lista`));
}

/**
 * Encerra a lista de pedidos no Firebase Realtime Database, marcando-a como fechada.
 * @param {string} dbPath - Caminho base no Realtime Database (ex: "UF/Cidade/Estabelecimento").
 * @return {void}
 */
export function encerrarLista(dbPath) {
  const db = getDatabase();

  // Marca a lista como fechada
  const updates = {
    [`${dbPath}/ListaAberta`]: false,
  };
  update(ref(db), updates);
}

/**
 * Reabre uma lista de pedidos no Firebase Realtime Database, marcando-a como aberta novamente.
 * @param {string} dbPath - Caminho base no Realtime Database (ex: "UF/Cidade/Estabelecimento").
 * @return {void}
 */
export function reabrirLista(dbPath) {
  const db = getDatabase();

  // Marca a lista como aberta novamente
  const updates = {
    [`${dbPath}/ListaAberta`]: true,
  };
  update(ref(db), updates);
}

/**
 * Marca o cliente/pedido como "ocioso" (em espera).
 * @param {string} dbPath - Caminho base no Realtime Database (ex: "UF/Cidade/Estabelecimento").
 * @param {string} idPedido - ID do pedido/cliente que será marcado como "ocioso".
 * @return {void}
 */
export function deixarClienteEmEspera(dbPath, idPedido) {
  const db = getDatabase();

  // Marca o cliente/pedido como ocioso (em espera)
  const updates = {
    [`${dbPath}/Lista/${idPedido}/ocioso`]: true,
  };
  update(ref(db), updates);
}

/**
 * Retorna o cliente/pedido de "ocioso" (em espera) para ativo.
 * @param {string} dbPath - Caminho base no Realtime Database (ex: "UF/Cidade/Estabelecimento").
 * @param {string} idPedido - ID do pedido/cliente que será retornado como ativo.
 * @return {void}
 */
export function retornarClienteEmEspera(dbPath, idPedido) {
  const db = getDatabase();

  // Marca o cliente/pedido como ativo novamente
  const updates = {
    [`${dbPath}/Lista/${idPedido}/ocioso`]: false,
  };
  update(ref(db), updates);
}

/**
 * Marca o cliente/pedido atual como concluído ou "inativo".
 * @param {string} dbPath - Caminho base no Realtime Database (ex: "UF/Cidade/Estabelecimento").
 * @param {string} idPedido - ID do pedido/cliente que será marcado como inativo.
 * @param {string} listaData - Data da lista de pedidos, usada para o contador diário.
 * @return {void}
 */
export function proximoCliente(dbPath, idPedido, listaData) {
  const db = getDatabase();
  const updates = {};

  // Marca o cliente/pedido como inativo
  updates[`${dbPath}/Lista/${idPedido}/ativo`] = false;
  update(ref(db), updates);

  // Atualiza o contador de pedidos chamados do dia (formato 'YYYY-MM-DD')
  updates[`${dbPath}/Contadores/${new Date(listaData).toLocaleDateString('en-CA')}/Chamados`] = increment(1);
  update(ref(db), updates);
}

/**
 * Remove o cliente/pedido da lista marcando-o como inativo e removido.
 * @param {string} dbPath - Caminho base no Realtime Database (ex: "UF/Cidade/Estabelecimento").
 * @param {string} idPedido - ID do pedido/cliente que será removido.
 * @param {string} listaData - Data da lista de pedidos, usada para o contador diário.
 * @return {void}
 */
export function removerCliente(dbPath, idPedido, listaData) {
  const db = getDatabase();
  const updates = {};

  // Marca o cliente/pedido como inativo
  updates[`${dbPath}/Lista/${idPedido}/ativo`] = false;
  update(ref(db), updates);

  // Marca o cliente/pedido como removido
  updates[`${dbPath}/Lista/${idPedido}/removido`] = true;
  update(ref(db), updates);

  // Atualiza o contador de pedidos removidos do dia (formato 'YYYY-MM-DD')
  updates[`${dbPath}/Contadores/${new Date(listaData).toLocaleDateString('en-CA')}/Removidos`] = increment(1);
  update(ref(db), updates);
}
