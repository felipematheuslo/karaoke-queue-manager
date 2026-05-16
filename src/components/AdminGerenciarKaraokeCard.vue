<template>
  <v-row justify="center">
    <v-col align="center" cols="12" md="10" class="pa-0 ma-0">
      <v-card variant="elevated" elevation="0">
        <v-card-title class="pa-0 mb-2">
          <p
            class="text-h5 mt-5"
            :style="{ fontFamily: `'Handlee', cursive`, color: corHeaderLinhas }"
          >
            <strong> GERENCIAR &nbsp; KARAOKÊ </strong>
          </p>
        </v-card-title>

        <v-row justify="center" class="px-5 mb-2">
          <v-col align="center" cols="6" class="px-1 py-0 mt-3">
            <v-btn
              block
              color="#020406"
              prepend-icon="mdi-book-open-page-variant"
              class="text-white"
              @click="dialogNovaLista = true"
            >
              Abrir Lista
            </v-btn>
          </v-col>

          <v-col align="center" cols="6" class="px-1 py-0 mt-3">
            <v-btn
              block
              color="#020406"
              prepend-icon="mdi-book-off"
              class="text-white"
              @click="encerrarLista"
            >
              Encerrar Lista
            </v-btn>
          </v-col>
        </v-row>

        <v-row justify="center" class="px-5 mb-2">
          <v-col align="center" class="pa-0 mt-4">
            <span>
              <b> STATUS: </b>
              <v-badge dot inline :color="listaAberta ? '#64CDC2' : 'warning'" />
              <span v-if="listaAberta">
                <strong style="color: #64cdc2"> LISTA ABERTA </strong>
              </span>
              <span v-else>
                <strong class="text-warning"> LISTA ENCERRADA </strong>
              </span>
            </span>
          </v-col>
        </v-row>

        <!-- Botão para chamar próximo cliente da lista -->
        <div class="mt-4 mb-2">
          <v-btn
            :disabled="
              listaKaraoke.length === 0 || indicePrimeiroFila === listaKaraoke.length
            "
            prepend-icon="mdi-microphone-variant"
            :color="corBotaoProximoCliente"
            width="280"
            class="mx-2 my-1 text-black"
            @click="proximoCliente(listaKaraoke[indicePrimeiroFila].id)"
          >
            Chamar próximo cliente
          </v-btn>

          <!-- Botão para deixar cliente atual em espera -->
          <v-btn
            :disabled="
              listaKaraoke.length === 0 || indicePrimeiroFila === listaKaraoke.length
            "
            prepend-icon="mdi-clock-outline"
            :color="corBotaoClienteEspera"
            width="280"
            class="mx-2 my-1 text-black"
            @click="deixarClienteEmEspera(listaKaraoke[indicePrimeiroFila].id)"
          >
            Deixar cliente na espera
          </v-btn>
        </div>

        <v-divider class="my-2" />

        <div style="float: right">
          <v-btn
            variant="outlined"
            size="small"
            class="mr-1"
            @click="dialogHistoricoLista = true"
          >
            LISTA TOTAL ({{ this.listaTotalLength }})
          </v-btn>
        </div>

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
            <!-- Primeira linha com cliente da vez e linha com cliente em espera -->
            <tr
              :style="
                item.indice === 1
                  ? `background-color: ${corClienteAtual}`
                  : item.ocioso
                  ? `background-color: ${corClienteEspera}`
                  : ''
              "
            >
              <!-- Coluna do botão de remover ou retornar cliente -->
              <td class="pl-1 pr-0">
                <v-btn
                  v-if="item.indice > 1"
                  variant="text"
                  icon="mdi-delete"
                  size="small"
                  @click="(this.dialogApagarCliente = true), (this.apagarId = item.id)"
                />
                <v-btn
                  v-if="item.ocioso"
                  variant="text"
                  icon="mdi-history"
                  size="small"
                  @click="
                    (this.dialogRetornarCliente = true), (this.retornarId = item.id)
                  "
                />
              </td>

              <!-- Coluna do índice dos clientes-->
              <td class="pr-0">
                <span v-if="item.ocioso"> - </span>
                <span v-else> {{ item.indice }} </span>
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

    <AdminHistoricoListaDialog
      v-model="dialogHistoricoLista"
      :dbPath="dbPath"
      :corClienteAtual="corClienteAtual"
      :corHeaderLinhas="corHeaderLinhas"
      :listaData="listaData"
    />

    <AdminNovaListaDialog v-model="dialogNovaLista" :dbPath="dbPath" />

    <AdminAvisoApagarClienteDialog
      v-model="dialogApagarCliente"
      :dbPath="dbPath"
      :apagarId="apagarId"
    />

    <AdminAvisoRetornarClienteDialog
      v-model="dialogRetornarCliente"
      :dbPath="dbPath"
      :retornarId="retornarId"
    />
  </v-row>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";
import * as adminFunctions from "@/utils/adminFunctions";
import AdminAvisoApagarClienteDialog from "@/components/AdminAvisoApagarClienteDialog.vue";
import AdminAvisoRetornarClienteDialog from "@/components/AdminAvisoRetornarClienteDialog.vue";
import AdminHistoricoListaDialog from "@/components/AdminHistoricoListaDialog.vue";
import AdminNovaListaDialog from "@/components/AdminNovaListaDialog.vue";

export default {
  components: {
    AdminAvisoApagarClienteDialog,
    AdminAvisoRetornarClienteDialog,
    AdminHistoricoListaDialog,
    AdminNovaListaDialog,
  },
  props: {
    dbPath: {
      type: String,
      required: true,
    },

    // Card da lista e botões de ação
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
    corBotaoProximoCliente: {
      type: String,
      default: "black",
    },
    corBotaoClienteEspera: {
      type: String,
      default: "black",
    },
  },
  data() {
    return {
      listaAberta: "",
      listaData: "",
      apagarId: "",
      retornarId: "",

      dialogNovaLista: false,
      dialogApagarCliente: false,
      dialogRetornarCliente: false,
      dialogHistoricoLista: false,

      indicePrimeiroFila: 0,
      listaTotalLength: 0,
      listaKaraoke: [],
      headers: [
        { sortable: false, title: "", align: "start" },
        { sortable: false, title: "#", align: "start", key: "indice" },
        { sortable: false, title: "CLIENTE", align: "start", key: "nomeCliente" },
        { sortable: false, title: "MÚSICA", align: "start", key: "musica" },
        { sortable: false, title: "CANTOR", align: "start", key: "banda" },
      ],

      listaKaraokeHistory: [],
    };
  },
  mounted() {
    this.carregarDados();
  },
  methods: {
    carregarDados() {
      const db = getDatabase();
      const dbRefLista = ref(db, this.dbPath + "/Lista");
      const dbRefListaAberta = ref(db, this.dbPath + "/ListaAberta");
      const dbRefDataLista = ref(db, this.dbPath + "/DataLista");

      onValue(dbRefLista, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          let dataArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          this.listaTotalLength = dataArray.length;

          const ociosos = [];
          this.indicePrimeiroFila = 0;

          for (let i = 0; i < dataArray.length; i++) {
            if (!dataArray[i].ativo) {
              dataArray.splice(i, 1);
              i--;
            } else if (dataArray[i].ocioso) {
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
          this.listaTotalLength = 0;
        }
      });

      onValue(dbRefListaAberta, (snapshot) => {
        const data = snapshot.val();
        this.listaAberta = data;
      });
      onValue(dbRefDataLista, (snapshot) => {
        const data = snapshot.val();
        this.listaData = data;
      });
    },

    encerrarLista() {
      adminFunctions.encerrarLista(this.dbPath);
    },

    proximoCliente(idPedido) {
      adminFunctions.proximoCliente(this.dbPath, idPedido, this.listaData);
    },

    deixarClienteEmEspera(idPedido) {
      adminFunctions.deixarClienteEmEspera(this.dbPath, idPedido);
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
