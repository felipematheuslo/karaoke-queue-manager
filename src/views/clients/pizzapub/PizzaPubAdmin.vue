<template>
  <v-app>
    <v-main class="full-height d-flex flex-column">
      <v-img
        color="#020406"
        height="auto"
      >
        <v-container v-if="isAuthValid()">
          <v-dialog
            v-model="payment"
            persistent
            max-width="500"
          >
            <v-card>
              <v-toolbar color="warning">
                <v-toolbar-title class="text-center mr-4">
                  <v-icon size="large">
                    mdi-alert-circle
                  </v-icon>
                </v-toolbar-title>
              </v-toolbar>

              <v-card-text class="pb-2">
                <p class="text-center">
                  Sistema indisponível por não pagamento.
                </p>
                <br>
                <p class="text-center">
                  Verifique com o desenvolvedor.
                </p>
                <br>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="dialogApagarLista"
            persistent
            max-width="400px"
          >
            <v-card>
              <v-card-title class="text-wrap text-center">
                AVISO
                <v-icon color="warning">
                  mdi-alert
                </v-icon>
              </v-card-title>
              <v-card-title class="text-wrap">
                Essa operação irá apagar todos os clientes da sua lista.
              </v-card-title>
              <v-card-title class="text-wrap">
                Deseja continuar?
              </v-card-title>
              <v-card-actions>
                <v-btn
                  color="grey"
                  variant="flat"
                  @click="dialogApagarLista = false"
                >
                  Não
                </v-btn>
                <v-btn
                  color="error"
                  variant="flat"
                  text
                  @click="listaClear"
                >
                  Sim
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="dialogApagarCliente"
            persistent
            max-width="400px"
          >
            <v-card>
              <v-card-title class="text-wrap text-center">
                AVISO
                <v-icon color="warning">
                  mdi-alert
                </v-icon>
              </v-card-title>
              <v-card-title class="text-wrap">
                Essa operação irá apagar o cliente da sua lista.
              </v-card-title>
              <v-card-title class="text-wrap">
                Deseja continuar?
              </v-card-title>
              <v-card-actions>
                <v-btn
                  color="grey"
                  variant="flat"
                  @click="dialogApagarCliente = false"
                >
                  Não
                </v-btn>
                <v-btn
                  color="error"
                  variant="flat"
                  text
                  @click="removePessoa(apagarId)"
                >
                  Sim
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="dialogRetornarCliente"
            persistent
            max-width="400px"
          >
            <v-card>
              <v-card-title class="text-wrap text-center">
                AVISO
                <v-icon color="warning">
                  mdi-alert
                </v-icon>
              </v-card-title>
              <v-card-title class="text-wrap">
                Essa operação irá retornar o cliente para sua lista.
              </v-card-title>
              <v-card-title class="text-wrap">
                Deseja continuar?
              </v-card-title>
              <v-card-actions>
                <v-btn
                  color="grey"
                  variant="flat"
                  @click="dialogRetornarCliente = false"
                >
                  Não
                </v-btn>
                <v-btn
                  color="error"
                  variant="flat"
                  text
                  @click="retornaPessoa(retornarId)"
                >
                  Sim
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="dialogAdicionarStaff"
            max-width="800"
            hide-overlay
            persistent
            transition="dialog-bottom-transition"
          >
            <v-card>
              <v-toolbar color="#E55E27">
                <v-toolbar-title
                  class="text-center mr-4"
                  style="font-size: 30px"
                >
                  Entrar na fila
                </v-toolbar-title>
              </v-toolbar>

              <v-card-text class="pb-2">
                <v-form class="mt-3">
                  <v-text-field
                    v-model="nomeStaff"
                    label="Seu nome *"
                    hint="* Campo obrigatório"
                    persistent-hint
                    variant="outlined"
                    class="my-2"
                  />
                </v-form>
              </v-card-text>

              <v-card-actions class="ma-3">
                <v-btn
                  size="large"
                  variant="flat"
                  color="error"
                  prepend-icon="mdi-close"
                  @click="dialogAdicionarStaff = false"
                >
                  Cancelar
                </v-btn>

                <v-spacer />

                <v-btn
                  :disabled="nomeCliente === ''"
                  size="large"
                  variant="flat"
                  color="success"
                  append-icon="mdi-send"
                  @click="enviarPedido"
                >
                  Enviar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-row justify="center">
            <v-col
              align="center"
              cols="12"
              class="pa-0"
            >
              <v-img
                width="120"
                :src="require('@/assets/karaoke/ms-cg-pizzapub/pizza-pub-1.jpg')"
                alt="Pizza Pub"
              />
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col
              align="center"
              cols="12"
              md="10"
              class="pa-0 ma-0"
            >
              <v-card
                variant="elevated"
                elevation="0"
              >
                <v-card-title class="pa-0 mb-2">
                  <p
                    class="text-h5 mt-5"
                    style="font-family: 'Handlee', cursive;"
                  >
                    GERENCIAR &nbsp; KARAOKÊ
                  </p>
                </v-card-title>

                <v-row
                  justify="center"
                  class="px-5 mb-2"
                >
                  <v-col
                    align="center"
                    cols="6"
                    class="px-1 py-0 mt-3"
                  >
                    <v-btn
                      block
                      color="success"
                      prepend-icon="mdi-book-open-page-variant"
                      @click="listaOpen"
                    >
                      Abrir Lista
                    </v-btn>
                  </v-col>

                  <v-col
                    align="center"
                    cols="6"
                    class="px-1 py-0 mt-3"
                  >
                    <v-btn
                      block
                      color="#020406"
                      prepend-icon="mdi-book-off"
                      @click="listaClose"
                    >
                      Encerrar Lista
                    </v-btn>
                  </v-col>

                  <v-col
                    align="center"
                    cols="6"
                    class="px-1 py-0 mt-3"
                  >
                    <v-btn
                      block
                      color="success"
                      prepend-icon="mdi-human-queue"
                      @click="dialogAdicionarStaff = true"
                    >
                      Adicionar Staff
                    </v-btn>
                  </v-col>

                  <v-col
                    align="center"
                    cols="6"
                    class="px-1 py-0 mt-3"
                  >
                    <v-btn
                      block
                      color="#020406"
                      prepend-icon="mdi-eraser"
                      @click="dialogApagarLista = true"
                    >
                      Apagar Lista
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row
                  justify="center"
                  class="px-5 mb-2"
                >
                  <v-col
                    align="center"
                    class="pa-0 mt-3"
                  >
                    <span>
                      <b> STATUS: </b>
                      <v-badge
                        dot
                        inline
                        :color="listaEnable ? 'success' : 'warning'"
                      />
                      <span
                        v-if="listaEnable"
                        class="text-success"
                      > LISTA ABERTA </span>
                      <span
                        v-else
                        class="text-warning"
                      > LISTA ENCERRADA </span>
                    </span>
                  </v-col>
                </v-row>

                <v-btn
                  :disabled="listaKaraoke.length === 0 || indicePrimeiroFila === listaKaraoke.length"
                  prepend-icon="mdi-microphone-variant"
                  color="#E6441B"
                  class="mt-5 mb-2 mx-2"
                  @click="listaProximo(listaKaraoke[indicePrimeiroFila].id)"
                >
                  Chamar próximo cliente
                </v-btn>

                <v-btn
                  :disabled="listaKaraoke.length === 0 || indicePrimeiroFila === listaKaraoke.length"
                  prepend-icon="mdi-clock-outline"
                  color="#FD9C65"
                  class="mt-2 mb-2 mx-2 text-white"
                  @click="listaEspera(listaKaraoke[indicePrimeiroFila].id)"
                >
                  Deixar cliente na espera
                </v-btn>

                <v-divider class="mt-2" />

                <v-data-table
                  :headers="headers"
                  :items="listaKaraoke"
                  :items-per-page="listaKaraoke.length"
                  item-key="id"
                  class="custom-header custom-border"
                >
                  <template #[`item`]="{ item }">
                    <tr :style="item.indice === 1 ? 'background-color: #81C784' : item.ocioso ? 'background-color: #FD9C65' : ''">
                      <!-- Coluna do botão de remover -->
                      <td class="pl-1 pr-0">
                        <v-btn
                          variant="text"
                          icon="mdi-delete"
                          size="small"
                          @click="dialogApagarCliente = true, apagarId = item.id"
                        />
                      </td>
                      <!-- Primeira linha com cliente da vez -->
                      <td
                        v-if="item.ocioso"
                        class="px-0"
                      >
                        <v-btn
                          variant="text"
                          icon="mdi-history"
                          size="small"
                          @click="dialogRetornarCliente = true, retornarId = item.id"
                        />
                      </td>
                      <td
                        v-else
                        class="pr-0"
                      >
                        {{ item.indice }}
                      </td>
                      <td class="pr-0">
                        {{ item.nomeCliente }}
                      </td>
                      <td class="pr-0">
                        {{ item.musica }}
                      </td>
                      <td class="pr-1">
                        {{ item.banda }}
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>

          <br>

          <v-divider
            :thickness="3"
            :style="{ borderColor: '#E55E27' }"
          />

          <v-row
            justify="center"
            class="pa-0 ma-0"
          >
            <v-col
              align="center"
              class="pa-0 ma-0 mt-4"
            >
              <p class="text-center">
                Felipe Laurindo © 2024
              </p>
            </v-col>
          </v-row>
        </v-container>

        <v-container v-else>
          <v-row justify="center">
            <v-col
              align="center"
              cols="12"
              md="10"
              class="pa-0 ma-0"
            >
              <v-card
                variant="elevated"
                elevation="0"
                class="pa-0"
                max-width="800"
              >
                <v-toolbar color="#E55E27">
                  <v-toolbar-title
                    class="text-center mr-4"
                    style="font-size: 22px"
                  >
                    ADMINISTRADOR
                  </v-toolbar-title>
                </v-toolbar>

                <v-form class="py-4 px-8">
                  <v-text-field
                    v-model="admin"
                    label="USUÁRIO"
                    variant="outlined"
                    class="mt-10"
                  />
                  <v-text-field
                    v-model="password"
                    label="SENHA"
                    :type="showPassword ? 'text' : 'password'"
                    variant="outlined"
                    class="mt-6"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showPassword = !showPassword"
                  />
                </v-form>

                <v-card-actions class="d-flex justify-center mb-4">
                  <v-btn
                    size="large"
                    variant="flat"
                    color="#E55E27"
                    prepend-icon="mdi-login"
                    @click="loginToggle = true"
                  >
                    Entrar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-main>
  </v-app>
</template>

<script>
import {getDatabase, ref, onValue, update, remove, set} from 'firebase/database';
import {useDisplay} from 'vuetify';

export default {
  data() {
    return {
      display: '',
      listaEnable: '',
      payment: '',
      apagarId: '',
      retornarId: '',
      nomeStaff: '',
      dialogApagarLista: false,
      dialogApagarCliente: false,
      dialogAdicionarStaff: false,
      dialogRetornarCliente: false,

      admin: '',
      password: '',

      loginToggle: false,
      showPassword: false,

      indicePrimeiroFila: 0,
      listaKaraoke: [],
      headers: [
        {sortable: false, title: '', align: 'start'},
        {sortable: false, title: '#', align: 'start', key: 'indice'},
        {sortable: false, title: 'CLIENTE', align: 'start', key: 'nomeCliente'},
        {sortable: false, title: 'MÚSICA', align: 'start', key: 'musica'},
        {sortable: false, title: 'CANTOR', align: 'start', key: 'banda'},
      ],
    };
  },
  mounted() {
    this.loadPage();
    this.display = useDisplay();
  },
  methods: {
    loadPage() {
      const db = getDatabase();
      const dbRefLista = ref(db, 'MS/CampoGrande/PizzaPub/Lista');
      const dbRefListaEnable = ref(db, 'MS/CampoGrande/PizzaPub/ListaAberta');
      const dbRefPayment = ref(db, 'MS/CampoGrande/PizzaPub/Payment');

      onValue(dbRefLista, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          let dataArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          const ociosos = [];
          this.indicePrimeiroFila = 0;
          for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].ocioso) {
              this.indicePrimeiroFila++;
              ociosos.push(dataArray[i]);
              dataArray.splice(i, 1);
              i--;
            }
          }

          dataArray = dataArray.map((obj, index) => ({
            ...obj,
            indice: index + 1,
          }));

          const resultado = ociosos.concat(dataArray);

          this.listaKaraoke = resultado;
        } else {
          this.listaKaraoke = [];
        }
      });

      onValue(dbRefListaEnable, (snapshot) => {
        const data = snapshot.val();
        this.listaEnable = data;
      });

      onValue(dbRefPayment, (snapshot) => {
        const data = snapshot.val();
        this.payment = !data;
      });
    },

    enviarPedido() {
      const pedido = {
        ativo: true,
        banda: '-',
        musica: '-',
        nomeCliente: 'STAFF ' + this.nomeStaff,
        ocioso: true,
        staff: true,
      };

      const db = getDatabase();
      const idEspecifico = String(Date.now() * -1);
      set(ref(db, `MS/CampoGrande/PizzaPub/Lista/${idEspecifico}`), pedido);

      this.nomeStaff = '';
      this.dialogAdicionarStaff = false;
    },

    isAuthValid() {
      const db = getDatabase();
      const dbRefAdmin = ref(db, 'MS/CampoGrande/PizzaPub/Admin');
      const dbRefPassword = ref(db, 'MS/CampoGrande/PizzaPub/Password');
      let admin = '';
      let password = '';

      onValue(dbRefAdmin, (snapshot) => {
        admin = snapshot.val();
      });
      onValue(dbRefPassword, (snapshot) => {
        password = snapshot.val();
      });

      if (this.loginToggle) {
        if (this.admin === admin) {
          if (this.password === password) {
            return true;
          }
        }
      }

      this.loginToggle = false;

      return false;
    },

    listaOpen() {
      const updates = {};
      updates['MS/CampoGrande/PizzaPub/ListaAberta'] = true;
      update(ref(getDatabase()), updates);
    },

    listaClose() {
      const updates = {};
      updates['MS/CampoGrande/PizzaPub/ListaAberta'] = false;
      update(ref(getDatabase()), updates);
    },

    async listaClear() {
      const db = getDatabase();

      try {
        const listaRef = ref(db, 'MS/CampoGrande/PizzaPub/Lista');
        await remove(listaRef);
        console.log('O nó MS/CampoGrande/PizzaPub/Lista foi removido com sucesso.');
      } catch (error) {
        console.error('Erro ao remover o nó:', error);
      }

      this.dialogApagarLista = false;
    },

    listaProximo(itemId) {
      const db = getDatabase();
      const itemRef = ref(db, `MS/CampoGrande/PizzaPub/Lista/${itemId}`);
      remove(itemRef);
    },

    listaEspera(itemId) {
      const updates = {};
      updates[`MS/CampoGrande/PizzaPub/Lista/${itemId}/ocioso`] = true;
      update(ref(getDatabase()), updates);
    },

    removePessoa(itemId) {
      const db = getDatabase();
      const itemRef = ref(db, `MS/CampoGrande/PizzaPub/Lista/${itemId}`);
      remove(itemRef);

      this.dialogApagarCliente = false;
      this.apagarId = '';
    },

    retornaPessoa(itemId) {
      const updates = {};
      updates[`MS/CampoGrande/PizzaPub/Lista/${itemId}/ocioso`] = false;
      update(ref(getDatabase()), updates);

      this.dialogRetornarCliente = false;
      this.retornarId = '';
    },
  },
};
</script>

<style>
body {
  font-family: 'Handlee', cursive;
}

.custom-border th,
.custom-border td {
  border-color: #E6441B !important; /* Cor das divisórias */
}

.custom-header th {
  color: #E6441B !important; /* Cor do texto do cabeçalho */
}

.custom-text-field .v-field-label {
  color: #E55E27; /* Cor do rótulo quando não está focado */
}
</style>
