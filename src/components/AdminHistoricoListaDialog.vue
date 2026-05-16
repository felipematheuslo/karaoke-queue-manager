<template>
  <!-- DIALOG HISTÓRICO -->
  <v-dialog v-model="dialogHistoricoLista" persistent fullscreen scrollable>
    <v-card>
      <v-card-actions class="pa-0">
        <v-btn icon="mdi-close-box" @click="fecharDialogo" />
      </v-card-actions>
      <v-card-title class="text-wrap text-center pa-0">
        <p class="text-h5" style="font-family: 'Handlee', cursive">Histórico da lista</p>
        <p class="text-body-2" style="font-family: 'Handlee', cursive">
          {{ new Date(listaData).toLocaleDateString() }}
        </p>
      </v-card-title>
      <v-card-text class="px-0">
        <v-data-table
          class="custom-border"
          :items="listaKaraokeHistory"
          item-key="id"
          :items-per-page="listaKaraokeHistory.length"
          :headers="headersKaraokeHistory"
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
                item.removido
                  ? 'background-color: #EF9A9A; text-decoration: line-through'
                  : item.ativo
                  ? ''
                  : `background-color: ${corClienteAtual}`
              "
            >
              <!-- Primeira linha com cliente da vez -->
              <td>{{ item.horaPedido }}</td>
              <td>{{ item.nomeCliente }}</td>
              <td>{{ item.musica }}</td>
              <td>{{ item.banda }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";

export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    dbPath: {
      type: String,
      required: true,
    },
    corClienteAtual: {
      type: String,
      default: "black",
    },
    corHeaderLinhas: {
      type: String,
      default: "black",
    },
    listaData: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      listaKaraokeHistory: [],
      headersKaraokeHistory: [
        { sortable: false, title: "HORA", align: "start", key: "horaPedido" },
        { sortable: false, title: "CLIENTE", align: "start", key: "nomeCliente" },
        { sortable: false, title: "MÚSICA", align: "start", key: "musica" },
        { sortable: false, title: "CANTOR", align: "start", key: "banda" },
      ],
    };
  },
  computed: {
    dialogHistoricoLista: {
      get() {
        return this.modelValue; // Retorna a visibilidade do pai
      },
      set(value) {
        this.$emit("update:modelValue", value); // Atualiza o valor no pai
      },
    },
  },
  mounted() {
    const db = getDatabase();
    const dbRefLista = ref(db, this.dbPath + "/Lista");

    onValue(dbRefLista, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        let dataArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        this.listaKaraokeHistory = [];

        for (let i = 0; i < dataArray.length; i++) {
          this.listaKaraokeHistory.push(dataArray[i]);
        }
      } else {
        this.listaKaraokeHistory = [];
      }
    });
  },
  methods: {
    fecharDialogo() {
      this.dialogHistoricoLista = false; // Fecha o diálogo
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
