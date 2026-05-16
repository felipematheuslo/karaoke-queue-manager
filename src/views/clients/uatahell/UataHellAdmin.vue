<template>
  <v-app v-if="isAuthenticated">
    <v-main class="full-height d-flex flex-column">
      <v-img :color="corPagina" height="auto">
        <v-container fill-height fluid>
          <v-row justify="center">
            <v-col align="center" cols="12" class="pa-0">
              <v-img width="250" :src="logoEstabelecimento" />
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

import logoEstabelecimento from "@/assets/ms-cg-uatahell/uatahell-logo.jpg"; // Logo do estabelecimento

export default {
  components: {
    AdminGerenciarKaraokeCard,
  },
  data() {
    return {
      isAuthenticated: false, // Controla se o usuário está autenticado
      dbPath: "MS/CampoGrande/Uatahell", // Rota para o Realtime Database

      // Página
      corPagina: "#A211E3", // Cor de fundo da página
      logoEstabelecimento: logoEstabelecimento,

      // Card principal com botões de ação e a lista
      corBotaoProximoCliente: "#4F9FF5", // Cor do botão 'Chamar próximo cliente'
      corBotaoClienteEspera: "#64CDC2", // Cor do botão 'Deixar cliente na espera'
      corClienteAtual: "#4F9FF5", // Cor de fundo da linha do cliente atual
      corClienteEspera: "#64CDC2", // Cor de fundo da linha dos clientes em espera
      corHeaderLinhas: "#A211E3", // Cor do texto de cabeçalho e linhas da tabela
    };
  },
  methods: {
    checkAuth() {
      onAuthStateChanged(auth, (user) => {
        if (user && user.email === "admin@email.com") {
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
