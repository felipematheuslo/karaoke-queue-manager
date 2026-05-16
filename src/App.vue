<template>
  <v-app>
    <v-main>
      <v-container class="fill-height d-flex align-center justify-center text-center">
        <div>
          <v-icon size="80" color="orange darken-2">mdi-tools</v-icon>
          <h1 class="display-2 font-weight-bold mt-4">Site em construção</h1>
          <p class="subtitle-1 mt-2">Estamos trabalhando para trazer algo incrível. Volte em breve!</p>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useDisplay } from "vuetify";

export default {
  data() {
    return {
      display: "",
    };
  },
  mounted() {
    this.display = useDisplay();
  },
};
</script>
