<template>
  <v-dialog
    v-model="dialogoFila"
    max-width="800"
    :fullscreen="display.smAndDown"
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card :style="{ backgroundColor: corDeFundo }">
      <v-toolbar :color="corToolbar">
        <v-toolbar-title class="text-center mr-4" style="font-size: 30px">
          Entrar na fila
        </v-toolbar-title>
      </v-toolbar>

      <v-card-text :style="{ backgroundColor: corDeFundo }" class="pb-2">
        <v-form class="mt-3">
          <v-text-field
            v-model="nomeCliente"
            label="Nome *"
            hint="* Campo obrigatório"
            persistent-hint
            variant="outlined"
            class="custom-text-field my-2"
          />
          <v-text-field
            v-model="sobrenomeCliente"
            label="Sobrenome *"
            hint="* Campo obrigatório"
            persistent-hint
            variant="outlined"
            class="custom-text-field my-2"
          />
          <v-text-field
            v-model="musica"
            label="Música"
            variant="outlined"
            class="custom-text-field my-2"
          />
          <v-text-field
            v-model="banda"
            label="Banda/Cantor"
            variant="outlined"
            class="custom-text-field mt-2"
          />
        </v-form>
      </v-card-text>

      <v-card-text :style="{ backgroundColor: corDeFundo }" class="pt-0">
        <p class="text-center" style="font-size: 18px">
          <strong> Regras do estabelecimento: </strong>
        </p>
        <br />
        <span>
          <p>
            <strong> Tempo para chegar ao palco: </strong> Cada participante tem um tempo
            limite de 1 minuto para chegar ao palco e iniciar sua apresentação.
          </p>
          <p>
            <strong> Uma Música por Vez: </strong> Cada pessoa pode colocar apenas uma
            música na fila por vez. Depois de cantar, pode adicionar outra.
          </p>
          <p>
            <strong> Proibido Vaiar: </strong> Vaiar os cantores é estritamente proibido.
          </p>
          <p>
            <strong> Ordem das Performances: </strong> Siga a ordem de inscrição para
            cantar, tentar pular a fila não será permitido.
          </p>
          <p>
            <strong> Uso dos equipamentos: </strong> Manuseie o microfone com cuidado,
            evite jogá-lo, batê-lo ou deixá-lo cair. Utilize o equipamento de som e imagem
            corretamente. Danos intencionais serão responsabilizados.
          </p>
          <p>
            <strong> Horário de Encerramento: </strong> Respeite o horário de encerramento
            da lista do Karaokê.
          </p>
          <p>
            <strong> Respeito ao Próximo: </strong> Mantenha o respeito com todos os
            participantes e funcionários. Brigas ou comportamentos desordeiros não serão
            tolerados.
          </p>
          <br />
          <b>
            Essas regras ajudam a garantir que todos tenham uma experiência positiva e
            divertida no karaokê.
          </b>
        </span>

        <v-checkbox
          v-model="regrasCheckBox"
          label="Concordo com as regras"
          value="regras"
          hide-details
          class="mt-4"
        />
      </v-card-text>

      <v-card-actions class="ma-3" :style="{ backgroundColor: corDeFundo }">
        <v-btn
          size="large"
          variant="flat"
          :color="corBotaoCancelar"
          prepend-icon="mdi-close"
          @click="fecharDialogo"
        >
          <span class="text-white"> Cancelar </span>
        </v-btn>

        <v-spacer />

        <v-btn
          :disabled="nomeCliente === '' || sobrenomeCliente === '' || !regrasCheckBox"
          size="large"
          variant="flat"
          :color="corBotaoEnviar"
          append-icon="mdi-send"
          class="text-white"
          @click="enviarPedido"
        >
          Enviar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";
import { useDisplay } from "vuetify";
import * as userFunctions from "@/utils/userFunctions";

export default {
  props: {
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
      display: "",
      regrasCheckBox: false,
      listaData: "",

      nomeCliente: "",
      sobrenomeCliente: "",
      musica: "",
      banda: "",
    };
  },
  computed: {
    dialogoFila: {
      get() {
        return this.modelValue; // Retorna a visibilidade do pai
      },
      set(value) {
        this.$emit("update:modelValue", value); // Atualiza o valor no pai
      },
    },
  },
  mounted() {
    this.display = useDisplay();

    const db = getDatabase();
    const dbRefDataLista = ref(db, this.dbPath + "/DataLista");

    onValue(dbRefDataLista, (snapshot) => {
      const data = snapshot.val();
      this.listaData = data;
    });
  },
  methods: {
    fecharDialogo() {
      this.dialogoFila = false; // Fecha o diálogo
      this.regrasCheckBox = false;
      this.banda = "";
      this.musica = "";
      this.nomeCliente = "";
      this.sobrenomeCliente = "";
    },
    enviarPedido() {
      userFunctions.enviarPedido(
        this.banda,
        this.musica,
        this.nomeCliente,
        this.sobrenomeCliente,
        this.dbPath,
        this.listaData
      );
      this.fecharDialogo();
    },
  },
};
</script>
