<template>
  <!-- DIALOG APAGAR CLIENTE -->
  <v-dialog v-model="dialogApagarCliente" persistent max-width="400px">
    <v-card>
      <v-card-title class="text-wrap text-center">
        AVISO
        <v-icon color="warning"> mdi-alert </v-icon>
      </v-card-title>
      <v-card-title class="text-wrap">
        Essa operação irá apagar o cliente da sua lista.
      </v-card-title>
      <v-card-title class="text-wrap"> Deseja continuar? </v-card-title>
      <v-card-actions>
        <v-btn color="grey" variant="flat" @click="fecharDialogo"> Não </v-btn>
        <v-btn color="error" variant="flat" @click="removerCliente"> Sim </v-btn>
      </v-card-actions>
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
    apagarId: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      listaData: "",
    };
  },
  computed: {
    dialogApagarCliente: {
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
    });
  },
  methods: {
    fecharDialogo() {
      this.dialogApagarCliente = false; // Fecha o diálogo
    },
    removerCliente() {
      adminFunctions.removerCliente(this.dbPath, this.apagarId, this.listaData);
      this.fecharDialogo();
    },
  },
};
</script>
