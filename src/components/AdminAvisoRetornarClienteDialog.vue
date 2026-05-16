<template>
  <!-- DIALOG RETORNAR CLIENTE -->
  <v-dialog v-model="dialogRetornarCliente" persistent max-width="400px">
    <v-card>
      <v-card-title class="text-wrap text-center">
        AVISO
        <v-icon color="warning"> mdi-alert </v-icon>
      </v-card-title>
      <v-card-title class="text-wrap">
        Essa operação irá retornar o cliente para sua lista.
      </v-card-title>
      <v-card-title class="text-wrap"> Deseja continuar? </v-card-title>
      <v-card-actions>
        <v-btn color="grey" variant="flat" @click="fecharDialogo"> Não </v-btn>
        <v-btn color="error" variant="flat" @click="retornarClienteEmEspera"> Sim </v-btn>
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
    retornarId: {
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
    dialogRetornarCliente: {
      get() {
        return this.modelValue; // Retorna a visibilidade do pai
      },
      set(value) {
        this.$emit("update:modelValue", value); // Atualiza o valor no pai
      },
    },
  },
  methods: {
    fecharDialogo() {
      this.dialogRetornarCliente = false; // Fecha o diálogo
    },
    retornarClienteEmEspera() {
      adminFunctions.retornarClienteEmEspera(this.dbPath, this.retornarId);
      this.fecharDialogo();
    },
  },
};
</script>
