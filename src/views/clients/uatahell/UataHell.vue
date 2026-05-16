<template>
  <v-app>
    <!-- Barra de navegação superior (App Bar) -->
    <SiteAppBar />
    <v-main>
      <v-img :color="corPagina" height="auto">
        <v-container fill-height fluid>
          <v-row justify="center">
            <v-col align="center" cols="12" class="pa-0">
              <v-img height="150" :src="bannerEstabelecimento" />
            </v-col>
          </v-row>

          <ClienteKaraokeListaCard
            :corBotaoEntrarFila="corBotaoEntrarFila"
            :corClienteAtual="corClienteAtual"
            :corClienteEspera="corClienteEspera"
            :corHeaderLinhas="corHeaderLinhas"
            :corToolbar="corToolbar"
            :corDeFundo="corDeFundo"
            :corBotaoCancelar="corBotaoCancelar"
            :corBotaoEnviar="corBotaoEnviar"
            :dbPath="dbPath"
          />

          <br />

          <v-divider :thickness="3" :style="{ borderColor: 'black' }" />

          <ClienteAvisoDadosPessoais />
        </v-container>
      </v-img>
    </v-main>
  </v-app>
</template>

<script>
import ClienteAvisoDadosPessoais from "@/components/ClienteAvisoDadosPessoais.vue";
import ClienteKaraokeListaCard from "@/components/ClienteKaraokeListaCard.vue";
import SiteAppBar from "@/components/SiteAppBar.vue";

import bannerEstabelecimento from "@/assets/ms-cg-uatahell/uatahell-cover.jpg"; // Banner do estabelecimento

export default {
  components: {
    ClienteAvisoDadosPessoais,
    ClienteKaraokeListaCard,
    SiteAppBar,
  },
  data() {
    return {
      dbPath: "MS/CampoGrande/Uatahell", // Rota para o Realtime Database

      // Página
      corPagina: "#A211E3", // Cor de fundo da página
      bannerEstabelecimento: bannerEstabelecimento,

      // Card principal com botão de entrar e a lista
      corBotaoEntrarFila: "#4F9FF5", // Cor do botão 'Entrar na fila'
      corClienteAtual: "#4F9FF5", // Cor de fundo da linha do cliente atual
      corClienteEspera: "#64CDC2", // Cor de fundo da linha dos clientes em espera
      corHeaderLinhas: "#A211E3", // Cor do texto de cabeçalho e linhas da tabela

      // Diálogo para entrar na fila
      corToolbar: "#AA1EE6", // Cor do cabeçalho do diálogo
      corDeFundo: "#64CDC2", // Cor de fundo do diálogo
      corBotaoCancelar: "black", // Cor do botão 'Cancelar'
      corBotaoEnviar: "#AA1EE6", // Cor do botão 'Enviar'
    };
  },
};
</script>

<style>
body {
  font-family: "Handlee", cursive;
}
</style>
