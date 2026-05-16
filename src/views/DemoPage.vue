<template>
  <v-app>
    <!-- Barra de navegação superior (App Bar) -->
    <SiteAppBar />

    <v-main>
      <v-img :color="corPagina" height="auto">
        <v-container fill-height fluid>
          <v-row justify="center">
            <v-col align="center" cols="12" md="10" class="pa-0">
              <v-img :src="bannerEstabelecimento" />
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

          <v-divider :thickness="3" :style="{ borderColor: 'white' }" />

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

import bannerEstabelecimento from "@/assets/karaoke/demo/demo-cliente.png"; // Banner do estabelecimento

export default {
  components: {
    ClienteAvisoDadosPessoais,
    ClienteKaraokeListaCard,
    SiteAppBar,
  },
  data() {
    return {
      dbPath: "Demo", // Rota para o Realtime Database

      // Página
      corPagina: "black", // Cor de fundo da página
      bannerEstabelecimento: bannerEstabelecimento,

      // Card principal com botão de entrar e a lista
      corBotaoEntrarFila: "#E47211", // Cor do botão 'Entrar na fila'
      corClienteAtual: "#E47211", // Cor de fundo da linha do cliente atual
      corClienteEspera: "#F1A767", // Cor de fundo da linha dos clientes em espera
      corHeaderLinhas: "#E47211", // Cor do texto de cabeçalho e linhas da tabela

      // Diálogo para entrar na fila
      corToolbar: "#E47211", // Cor do cabeçalho do diálogo
      corDeFundo: "white", // Cor de fundo do diálogo
      corBotaoCancelar: "black", // Cor do botão 'Cancelar'
      corBotaoEnviar: "#E47211", // Cor do botão 'Enviar'
    };
  },
};
</script>

<style>
body {
  font-family: "Handlee", cursive;
}
</style>
