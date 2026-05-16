<template>
  <v-app v-if="isAuthenticated">
    <v-main class="full-height d-flex flex-column">
      <v-img :color="corPagina" height="auto">
        <v-container fill-height fluid>
          <v-row justify="center">
            <v-col align="center" cols="12" md="10" class="pa-0">
              <v-img :src="logoEstabelecimento" />
            </v-col>
          </v-row>

          <AdminGerenciarKaraokeCard
            :corClienteAtual="corClienteAtual"
            :corClienteEspera="corClienteEspera"
            :corHeaderLinhas="corHeaderLinhas"
            :corBotaoProximoCliente="corBotaoProximoCliente"
            :corBotaoClienteEspera="corBotaoClienteEspera"
            :dbPath="dbPath"
          />

          <br />
        </v-container>
      </v-img>
    </v-main>
  </v-app>
</template>

<script>
import { auth } from "@/pages/login";
import { onAuthStateChanged } from "firebase/auth";
import * as adminFunctions from "@/utils/adminFunctions";
import AdminGerenciarKaraokeCard from "@/components/AdminGerenciarKaraokeCard.vue";

import logoEstabelecimento from "@/assets/karaoke/demo/demo-gestao.png"; // Banner do estabelecimento

export default {
  components: {
    AdminGerenciarKaraokeCard,
  },
  data() {
    return {
      isAuthenticated: false, // Controla se o usuário está autenticado
      dbPath: "Demo", // Rota para o Realtime Database

      // Página
      corPagina: "#000", // Cor de fundo da página
      logoEstabelecimento: logoEstabelecimento,

      // Card principal com botões de ação e a lista
      corBotaoProximoCliente: "#E47211", // Cor do botão 'Chamar próximo cliente'
      corBotaoClienteEspera: "#F1A767", // Cor do botão 'Deixar cliente na espera'
      corClienteAtual: "#E47211", // Cor de fundo da linha do cliente atual
      corClienteEspera: "#F1A767", // Cor de fundo da linha dos clientes em espera
      corHeaderLinhas: "#E47211", // Cor do texto de cabeçalho e linhas da tabela
    };
  },
  methods: {
    checkAuth() {
      onAuthStateChanged(auth, (user) => {
        if (user && user.email === "lugarteste@email.com") {
          this.isAuthenticated = true; // Permitir acesso
        } else {
          window.location.href = "/login"; // Redirecionar para login
        }
      });
    },
  },
  mounted() {
    // Verifica a autenticação assim que o componente for montado
    this.checkAuth();
  },
};
</script>

<style>
body {
  font-family: "Handlee", cursive;
}
</style>
