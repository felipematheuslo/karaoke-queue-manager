<template>
  <v-app>
    <!-- Barra de navegação superior (App Bar) -->
    <SiteAppBar />

    <!-- Imagem de destaque superior -->
    <v-img :src="display.xs ? home1Phone : home1Desktop" class="mt-14 bg-black" contain cover></v-img>

    <!-- Imagem de destaque inferior -->
    <v-img :src="display.xs ? home2Phone : home2Desktop" contain cover class="bg-black">
      <!-- Container para posicionar o botão -->
      <v-container class="fill-height ma-0 pa-0">
        <v-btn variant="outlined" href="/karaoke/sistema" color="white" :size="display.mdAndUp ? 'large' : 'default'"
          :style="{
            position: 'absolute',
            bottom: display.xs ? '42%' : '7%',
            left: display.xs ? '50%' : '20%',
            transform: display.xs ? 'translateX(-50%)' : 'none',
            zIndex: 1,
          }">
          Veja a demonstração
        </v-btn>
      </v-container>
    </v-img>

    <!-- Seção de contato -->
    <v-row align="center" justify="center" class="bg-black text-white ma-0 pa-0">
      <v-col cols="12" class="text-center ma-0 pa-0">
        <h1 class="my-14 mx-10">A praticidade em suas mãos</h1>
        <h2 class="my-4">Fale conosco:</h2>
        <h3 class="mb-8" @click="sendWhatsapp">
          <v-icon class="mb-1">mdi-whatsapp</v-icon>
          (11) 91246-0542
        </h3>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import SiteAppBar from "@/components/SiteAppBar.vue";
import { useDisplay } from "vuetify";
import home1Phone from "@/assets/home-1-phone.png";
import home2Phone from "@/assets/home-2-phone.png";
import home1Desktop from "@/assets/home-1-desktop.png";
import home2Desktop from "@/assets/home-2-desktop.png";

export default {
  components: {
    SiteAppBar,
  },
  data() {
    return {
      display: "",

      home1Phone,
      home1Desktop,
      home2Phone,
      home2Desktop,
    };
  },
  mounted() {
    this.display = useDisplay();
  },
  methods: {

    sendWhatsapp() {
      window.location.href = `https://wa.me/5511912460542?text=${encodeURIComponent(
        "Olá, gostaria de conhecer o Mexerico Karaokês."
      )}`;
    },
  },
};
</script>
