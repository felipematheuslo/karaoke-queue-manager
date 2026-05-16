<template>
  <v-app>
    <!-- Barra de navegação superior (App Bar) -->
    <SiteAppBar />

    <!-- Imagem de destaque -->
    <v-img
      :src="display.xs ? sistema1Phone : sistema1Desktop"
      class="mt-14 bg-black"
      contain
      cover
    >
      <!-- Container para posicionar o botão -->
      <v-container v-if="display.smAndUp" class="fill-height ma-0 pa-0">
        <v-btn
          variant="outlined"
          :href="`https://wa.me/5511912460542?text=${encodeURIComponent(
            'Olá, gostaria de conhecer o Mexerico Karaokês.'
          )}`"
          target="_blank"
          color="white"
          :size="display.mdAndUp ? 'large' : 'default'"
          :style="{
            position: 'absolute',
            bottom: '6%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }"
        >
          Seja cliente
        </v-btn>
      </v-container>
    </v-img>

    <v-img v-if="display.xs" :src="sistema2Phone" class="bg-black" contain cover> </v-img>

    <!-- Seção de contato -->
    <v-row align="center" justify="center" class="bg-black text-white ma-0 pa-0">
      <v-col cols="12" class="text-center ma-0 pa-0">
        <h2 v-if="display.xs" class="my-14 mx-4">
          Com o Mexerico Karaokês a fila deixa de ser um problema e vira uma experiência
          organizada e inesquecível.
        </h2>
        <v-btn
          v-if="display.xs"
          variant="outlined"
          size="large"
          target="_blank"
          color="white"
          @click="sendWhatsapp"
        >
          Seja cliente
        </v-btn>
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
import sistema1Phone from "@/assets/karaoke/sistema-1-phone.png";
import sistema2Phone from "@/assets/karaoke/sistema-2-phone.png";
import sistema1Desktop from "@/assets/karaoke/sistema-1-desktop.png";

export default {
  components: {
    SiteAppBar,
  },
  data() {
    return {
      display: "",

      sistema1Phone,
      sistema2Phone,
      sistema1Desktop,
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
