<template>
  <!-- DIALOG NOVA LISTA -->
  <v-dialog v-model="dialogNovaLista" persistent max-width="400px">
    <v-card>
      <v-card-actions class="pa-0">
        <v-btn icon="mdi-close-box" @click="fecharDialogo" />
      </v-card-actions>
      <v-card-text class="text-wrap text-center mb-6">
        <v-btn
          color="#A211E3"
          variant="flat"
          prepend-icon="mdi-book-open-blank-variant"
          size="large"
          min-width="280px"
          class="mt-1"
          @click="abrirNovaLista"
        >
          Abrir &nbsp;nova &nbsp;lista
        </v-btn>

        <v-btn
          color="#A211E3"
          variant="flat"
          prepend-icon="mdi-arrow-u-right-bottom"
          size="large"
          min-width="280px"
          class="mt-5"
          @click="reabrirLista"
        >
          Reabrir &nbsp;última &nbsp;lista
        </v-btn>
        <p v-if="diasCorridos === 0">Criada hoje</p>
        <p v-if="diasCorridos === 1">Criada ontem</p>
        <p v-if="diasCorridos > 1">Criada há {{ this.diasCorridos }} dias</p>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";
import * as adminFunctions from "@/utils/adminFunctions";

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
  },
  emits: ["update:modelValue"],
  data() {
    return {
      listaData: "",
      diasCorridos: "",
    };
  },
  computed: {
    dialogNovaLista: {
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
    const dbRefDataLista = ref(db, this.dbPath + "/DataLista");

    onValue(dbRefDataLista, (snapshot) => {
      const data = snapshot.val();
      this.listaData = data;
      this.diasCorridos = new Date() - new Date(data);
      this.diasCorridos = Math.floor(this.diasCorridos / (1000 * 60 * 60 * 24));
    });
  },
  methods: {
    fecharDialogo() {
      this.dialogNovaLista = false; // Fecha o diálogo
    },
    abrirNovaLista() {
      adminFunctions.abrirNovaLista(this.dbPath);
      this.fecharDialogo();
    },
    reabrirLista() {
      adminFunctions.reabrirLista(this.dbPath);
      this.fecharDialogo();
    },
  },
};
</script>
