<template>
  <v-app :style="appStyles">
    <v-main class="pa-0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light';
    },
    appStyles() {
      return {
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: this.$vuetify.theme.themes[this.theme].background,
        color: this.$vuetify.theme.themes[this.theme].textPrimary,
        transition: 'background-color 0.3s ease'
      };
    },
  },
};
</script>

