<template>
  <v-row justify="center" class="pa-0 ma-0">
    <v-col cols="12" align="center" class="pa-0 ma-0 mt-4">
      <v-btn :color="corBotaoAdmin" prepend-icon="mdi-account-tie" :href="linkBotaoAdmin">
        ADMIN
      </v-btn>
    </v-col>
    <v-col cols="12" align="center" class="pa-0 mt-4">
      <p class="text-center mt-1" style="font-size: 19px">
        Desenvolvido por Felipe Laurindo &copy;
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    corBotaoAdmin: {
      type: String,
      default: "black",
    },
    linkBotaoAdmin: {
      type: String,
      default: "/",
    },
  },
};
</script>
