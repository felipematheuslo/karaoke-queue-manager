<template>
  <v-app>
    <v-main>
      <v-img color="#020406" height="auto">
        <v-container fill-height fluid>
          <v-dialog
            v-model="dialogoFila"
            max-width="800"
            :fullscreen="display.smAndDown"
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <v-card style="background-color: #020406">
              <v-toolbar color="#E55E27">
                <v-toolbar-title class="text-center mr-4" style="font-size: 30px">
                  Entrar na fila
                </v-toolbar-title>
              </v-toolbar>

              <v-card-text style="background-color: #020406" class="pb-2">
                <v-form class="mt-3">
                  <v-text-field
                    v-model="nomeCliente"
                    label="Nome *"
                    hint="* Campo obrigatório"
                    persistent-hint
                    variant="outlined"
                    base-color="white"
                    color="white"
                    class="custom-text-field my-2"
                  />
                  <v-text-field
                    v-model="sobrenomeCliente"
                    label="Sobrenome *"
                    hint="* Campo obrigatório"
                    persistent-hint
                    variant="outlined"
                    base-color="white"
                    color="white"
                    class="custom-text-field my-2"
                  />
                  <v-text-field
                    v-model="musica"
                    label="Música"
                    variant="outlined"
                    base-color="white"
                    color="white"
                    class="custom-text-field my-2"
                  />
                  <v-text-field
                    v-model="banda"
                    label="Banda/Cantor"
                    variant="outlined"
                    base-color="white"
                    color="white"
                    class="custom-text-field mt-2"
                  />
                </v-form>
              </v-card-text>

              <v-card-text style="background-color: #020406; overflow: auto" class="pt-0">
                <p class="text-white text-center" style="font-size: 20px">
                  Regras do estabelecimento:
                </p>
                <br />
                <span class="text-white">
                  <p>
                    - Tempo para chegar ao palco: Cada participante tem um tempo limite de
                    1 minuto para chegar ao palco e iniciar sua apresentação.
                  </p>
                  <p>
                    - Uma Música por Vez: Cada pessoa pode colocar apenas uma música na
                    fila por vez. Depois de cantar, pode adicionar outra.
                  </p>
                  <p>- Proibido Vaiar: Vaiar os cantores é estritamente proibido.</p>
                  <p>
                    - Ordem das Performances: Siga a ordem de inscrição para cantar,
                    tentar pular a fila não será permitido.
                  </p>
                  <p>
                    - Uso dos equipamentos: Manuseie o microfone com cuidado, evite
                    jogá-lo, batê-lo ou deixá-lo cair, Utilize o equipamento de som e
                    imagem corretamente. Danos intencionais serão responsabilizados.
                  </p>
                  <p>
                    - Horário de Encerramento: Respeite o horário de encerramento da lista
                    do Karaokê.
                  </p>
                  <p>
                    - Respeito ao Próximo: Mantenha o respeito com todos os participantes
                    e funcionários, brigas ou comportamentos desordeiros não serão
                    tolerados.
                  </p>
                  <br />
                  <b>
                    Essas regras ajudam a garantir que todos tenham uma experiência
                    positiva e divertida no karaokê.
                  </b>
                </span>

                <v-checkbox
                  v-model="regrasCheckBox"
                  color="success"
                  label="Concordo com as regras"
                  value="regras"
                  hide-details
                  class="text-white mt-4"
                />
              </v-card-text>

              <v-card-actions class="ma-3" style="background-color: #020406">
                <v-btn
                  size="large"
                  variant="flat"
                  color="error"
                  prepend-icon="mdi-close"
                  @click="dialogoFila = false"
                >
                  Cancelar
                </v-btn>

                <v-spacer />

                <v-btn
                  :disabled="
                    nomeCliente === '' || sobrenomeCliente === '' || !regrasCheckBox
                  "
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
            <v-col align="center" cols="12" class="pa-0">
              <v-img
                width="500"
                :src="require('@/assets/karaoke/ms-cg-pizzapub/pizza-pub-2.jpg')"
                alt="Pizza Pub"
              />
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col align="center" cols="12" md="10" class="pa-0 ma-0">
              <v-card variant="elevated" elevation="0">
                <v-card-title class="pa-0">
                  <p class="text-h4 mt-5" style="font-family: 'Handlee', cursive">
                    KARAOKÊ
                  </p>
                </v-card-title>

                <v-data-table
                  :headers="headers"
                  :items="listaKaraoke"
                  item-key="id"
                  class="custom-header custom-border"
                >
                  <template #[`item`]="{ item }">
                    <tr
                      :style="
                        item.indice === 1
                          ? 'background-color: #81C784'
                          : item.ocioso
                          ? 'background-color: #FD9C65'
                          : ''
                      "
                    >
                      <!-- Primeira linha com cliente da vez -->
                      <td v-if="item.ocioso" class="pl-3 pr-0">
                        <v-icon size="small"> mdi-clock-outline </v-icon>
                      </td>
                      <td v-else class="pr-0">
                        {{ item.indice }}
                      </td>
                      <td>
                        <v-icon
                          v-if="item.staff"
                          size="x-small"
                          color="primary"
                          class="pb-1"
                        >
                          mdi-check-decagram
                        </v-icon>
                        {{ item.nomeCliente }}
                      </td>
                      <td>{{ item.musica }}</td>
                      <td>{{ item.banda }}</td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col
              cols="8"
              md="3"
              align="center"
              class="mx-0 mb-0 mt-3 px-0 align-center"
            >
              <v-btn
                v-if="payment"
                block
                :disabled="!listaEnable"
                size="large"
                color="#E55E27"
                :append-icon="listaEnable ? 'mdi-human-queue' : 'mdi-book-off'"
                @click="dialogoFila = true"
              >
                <span v-if="listaEnable"> Entrar na fila </span>
                <span v-else> Lista Encerrada </span>
              </v-btn>

              <v-btn
                v-if="!payment"
                block
                disabled
                size="large"
                color="warning"
                append-icon="mdi-alert-circle"
              >
                Sistema indisponível
              </v-btn>
            </v-col>
          </v-row>

          <br />

          <v-divider :thickness="3" :style="{ borderColor: '#E55E27' }" />

          <v-row justify="center">
            <v-col align="center" cols="12" md="10" class="my-0">
              <br />
              <p
                class="text-h6 text-white"
                align="center"
                style="font-family: 'Handlee', cursive"
              >
                Aviso
                <v-icon color="orange" size="x-small" class="pb-1">
                  mdi-alert-outline
                </v-icon>
              </p>
              <p class="text-body text-white mt-1" align="center">
                NENHUMA INFORMAÇÃO PESSOAL É COLETADA DOS USUÁRIOS.
              </p>
              <br />
            </v-col>
          </v-row>

          <v-divider :thickness="3" :style="{ borderColor: '#E55E27' }" />

          <v-row justify="center" class="pa-0 ma-0">
            <v-col align="center" class="pa-0 ma-0 mt-4 d-inline-flex">
              <v-btn variant="text" prepend-icon="mdi-account-tie" href="pizzapub/admin">
                ADMIN
              </v-btn>

              <v-spacer />

              <p class="text-center mt-2">Felipe Laurindo © 2024</p>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-main>
  </v-app>
</template>

<script>
import { getDatabase, ref, onValue, push } from "firebase/database";
import { useDisplay } from "vuetify";

export default {
  data() {
    return {
      display: "",
      listaEnable: "",
      payment: "",
      dialogoFila: false,
      regrasCheckBox: false,

      nomeCliente: "",
      sobrenomeCliente: "",
      musica: "",
      banda: "",

      listaKaraoke: [],
      headers: [
        { sortable: false, title: "#", align: "start", key: "indice" },
        { sortable: false, title: "CLIENTE", align: "start", key: "nomeCliente" },
        { sortable: false, title: "MÚSICA", align: "start", key: "musica" },
        { sortable: false, title: "BANDA/CANTOR", align: "start", key: "banda" },
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
      const dbRefLista = ref(db, "MS/CampoGrande/PizzaPub/Lista");
      const dbRefListaEnable = ref(db, "MS/CampoGrande/PizzaPub/ListaAberta");
      const dbRefPayment = ref(db, "MS/CampoGrande/PizzaPub/Payment");

      onValue(dbRefLista, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          let dataArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          const ociosos = [];
          for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].ocioso) {
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
        this.payment = data;
      });
    },

    enviarPedido() {
      if (this.banda === "") {
        this.banda = "-";
      }

      if (this.musica === "") {
        this.musica = "-";
      }

      const pedido = {
        ativo: true,
        banda: this.banda,
        musica: this.musica,
        nomeCliente: this.nomeCliente + " " + this.sobrenomeCliente,
        ocioso: false,
      };

      const db = getDatabase();
      push(ref(db, "MS/CampoGrande/PizzaPub/Lista"), pedido);

      this.banda = "";
      this.musica = "";
      this.nomeCliente = "";
      this.sobrenomeCliente = "";
      this.dialogoFila = false;
      this.regrasCheckBox = false;
    },
  },
};
</script>

<style>
body {
  font-family: "Handlee", cursive;
}

.custom-border th,
.custom-border td {
  border-color: #e6441b !important;
}

.custom-header th {
  color: #e6441b !important;
}

.custom-text-field .v-input__control .v-input__slot::before,
.custom-text-field .v-input__control .v-input__slot::after {
  border-color: white !important;
}

.custom-text-field .v-input__control,
.custom-text-field .v-label,
.custom-text-field .v-input__hint {
  color: white !important;
}

.v-messages__message {
  color: white !important;
}
</style>
