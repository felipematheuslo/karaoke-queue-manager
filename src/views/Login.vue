<template>
  <v-app>
    <!-- Barra de navegação superior (App Bar) -->
    <SiteAppBar />

    <!-- Tela de Login -->
    <v-container
      fluid
      class="bg-black text-white fill-height d-flex align-center justify-center"
    >
      <v-card class="pa-8" style="width: 300px; background-color: #1e1e1e">
        <v-card-title
          class="text-uppercase text-h6 text-wrap text-center text-white mb-6"
        >
          Área de acesso
        </v-card-title>

        <v-card-text>
          <v-form ref="form" lazy-validation>
            <!-- Campo de Usuário -->
            <v-text-field
              v-model="login.user"
              required
              type="text"
              label="Usuário"
              single-line
              variant="outlined"
              density="comfortable"
              color="white"
            ></v-text-field>

            <!-- Campo de Senha com Visibilidade Alternável -->
            <v-text-field
              v-model="login.password"
              required
              :type="showPassword ? 'text' : 'password'"
              label="Senha"
              single-line
              variant="outlined"
              density="comfortable"
              color="white"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="togglePasswordVisibility"
            ></v-text-field>

            <!-- Mensagem de erro abaixo do campo de senha -->
            <v-text v-if="errorMessage" class="mt-2" style="color: #ff4d4d">
              {{ errorMessage }}
            </v-text>

            <!-- Botão de Login -->
            <v-btn class="mt-4" block color="#01015D" @click="handleSubmit">
              <v-text>Entrar</v-text>
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import { auth } from "@/pages/login";
import {
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import SiteAppBar from "@/components/SiteAppBar.vue";

export default {
  components: {
    SiteAppBar,
  },
  data() {
    return {
      login: {
        user: "",
        password: "",
      },
      showPassword: false, // Controle para alternar a visibilidade da senha
      errorMessage: "", // Armazena a mensagem de erro
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleSubmit() {
      this.errorMessage = ""; // Limpa a mensagem de erro antes de tentar fazer login
      this.login.user = this.login.user.trim(); // Elimina espaços em branco no usuário
      this.login.password = this.login.password.trim(); // Elimina espaços em branco na senha
      try {
        // Se há um usuário logado, o desconecta
        await signOut(auth);

        // Realiza o login com o novo usuário
        const userCredential = await signInWithEmailAndPassword(
          auth,
          `${this.login.user}@email.com`,
          this.login.password
        );
        // Redirecionar após o login bem-sucedido
        switch (userCredential.user.email) {
          // Página de demonstração
          case "lugarteste@email.com":
            window.location.href = "/karaoke/demo/admin";
            break;

          // MS - Campo Grande - Uatahell
          case "admin@email.com":
            window.location.href = "/karaoke/uatahell/admin";
            break;

          default:
            alert("Página não definida para este usuário.");
        }
      } catch (error) {
        // Exibe o erro na tela
        this.errorMessage = "Usuário ou senha inválidos.";
      }
    },
  },
  mounted() {
    // Configura persistência para manter a sessão enquanto o navegador ou aba estiverem abertos
    setPersistence(auth, browserSessionPersistence);
  },
};
</script>

<style>
.v-input__control {
  color: white;
}
</style>
