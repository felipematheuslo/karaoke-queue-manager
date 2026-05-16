<template>
  <v-row justify="center">
    <v-col align="center" cols="12" md="10" class="pa-0 ma-0">
      <v-card variant="elevated" elevation="0">
        <v-card-title class="pa-0">
          <p class="text-h4 mt-5" style="font-family: 'Handlee', cursive">KARAOKÊ</p>
        </v-card-title>

        <v-row justify="center">
          <v-col cols="6" md="3" align="center" class="mx-0 mb-1 mt-3 px-0 align-center">
            <v-btn
              :append-icon="listaAberta ? 'mdi-human-queue' : 'mdi-book-off'"
              block
              :color="corBotaoEntrarFila"
              :disabled="!listaAberta"
              elevation="2"
              @click="dialogoFila = true"
            >
              <span v-if="listaAberta"> Entrar na fila </span>
              <span v-else> Lista Encerrada </span>
            </v-btn>
          </v-col>
        </v-row>

        <v-data-table
          class="custom-border"
          :items="listaKaraoke"
          item-key="id"
          :items-per-page="listaKaraoke.length"
          :headers="headers"
          :header-props="{
            style: {
              color: corHeaderLinhas,
              borderBottom: `1px solid`,
            },
          }"
          :style="{ '--border-color': corHeaderLinhas }"
        >
          <template #[`item`]="{ item }">
            <tr
              :style="
                item.indice === 1
                  ? `background-color: ${corClienteAtual}`
                  : item.ocioso
                  ? `background-color: ${corClienteEspera}`
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
              <td>{{ item.nomeCliente }}</td>
              <td>{{ item.musica }}</td>
              <td>{{ item.banda }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-col>

    <ClienteEntrarListaDialog
      v-model="dialogoFila"
      :dbPath="dbPath"
      :corToolbar="corToolbar"
      :corDeFundo="corDeFundo"
      :corBotaoCancelar="corBotaoCancelar"
      :corBotaoEnviar="corBotaoEnviar"
    />
  </v-row>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";
import ClienteEntrarListaDialog from "@/components/ClienteEntrarListaDialog.vue";

export default {
  components: {
    ClienteEntrarListaDialog,
  },
  props: {
    // Card da lista
    corBotaoEntrarFila: {
      type: String,
      default: "black",
    },
    corClienteAtual: {
      type: String,
      default: "black",
    },
    corClienteEspera: {
      type: String,
      default: "black",
    },
    corHeaderLinhas: {
      type: String,
      default: "black",
    },

    // Dialog de pedido
    corToolbar: {
      type: String,
      default: "black",
    },
    corDeFundo: {
      type: String,
      default: "black",
    },
    corBotaoCancelar: {
      type: String,
      default: "black",
    },
    corBotaoEnviar: {
      type: String,
      default: "black",
    },

    dbPath: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialogoFila: false,
      listaAberta: false,
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
    this.carregarDados();
  },
  methods: {
    carregarDados() {
      const db = getDatabase();
      const dbRefLista = ref(db, `${this.dbPath}/Lista`);
      const dbRefListaAberta = ref(db, `${this.dbPath}/ListaAberta`);

      onValue(dbRefLista, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          let dataArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          const ociosos = [];
          for (let i = 0; i < dataArray.length; i++) {
            if (!dataArray[i].ativo) {
              dataArray.splice(i, 1);
              i--;
            } else if (dataArray[i].ocioso) {
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

      onValue(dbRefListaAberta, (snapshot) => {
        this.listaAberta = snapshot.val();
      });
    },
  },
};
</script>

<style scoped>
.custom-border th,
.custom-border td {
  border-color: var(--border-color) !important;
}
</style>
