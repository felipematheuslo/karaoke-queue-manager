<template>
  <!-- Barra de navegação superior (App Bar) -->
  <v-app-bar color="black" density="comfortable">
    <v-container fluid class="d-flex align-center justify-space-between ma-0 pa-2">
      <!-- Logo do sistema -->
      <div class="pt-2">
        <img
          :src="display.smAndUp ? logoLarge : logoMedium"
          alt="Mexerico Karaokês"
          height="40"
          @click="goToHomePage"
        />
      </div>

      <!-- Navegação -->
      <nav class="d-flex">
        <v-btn href="/karaoke" class="pa-0 ma-0">
          <v-row justify="center" class="pa-0 ma-0">
            <v-col align="center" cols="12" class="pa-0 ma-0">
              <v-icon size="x-large">mdi-home</v-icon>
            </v-col>
            <v-col align="center" cols="12" class="pa-0 ma-0">
              <span style="font-size: 10px">HOME</span>
            </v-col>
          </v-row>
        </v-btn>

        <v-btn href="/karaoke/sistema" class="pa-0 ma-0">
          <v-row justify="center" class="pa-0 ma-0">
            <v-col align="center" cols="12" class="pa-0 ma-0">
              <v-icon size="x-large">mdi-laptop</v-icon>
            </v-col>
            <v-col align="center" cols="12" class="pa-0 ma-0">
              <span style="font-size: 10px">NOSSO SISTEMA</span>
            </v-col>
          </v-row>
        </v-btn>

        <v-btn href="/karaoke/login" class="pa-0 ma-0">
          <v-row justify="center" class="pa-0 ma-0">
            <v-col align="center" cols="12" class="pa-0 ma-0">
              <v-icon size="x-large">mdi-login</v-icon>
            </v-col>
            <v-col align="center" cols="12" class="pa-0 ma-0">
              <span style="font-size: 10px">ACESSO</span>
            </v-col>
          </v-row>
        </v-btn>
      </nav>
    </v-container>
  </v-app-bar>
</template>

<script>
import { useDisplay } from "vuetify";
import logoLarge from "@/assets/logo-large.png";
import logoMedium from "@/assets/logo-medium.png";

export default {
  data() {
    return {
      display: "",
      menu: false,

      logoLarge,
      logoMedium,
    };
  },
  mounted() {
    this.display = useDisplay();
  },
  methods: {
    goToHomePage() {
      window.location.href = "/karaoke";
    },
  },
};
</script>
