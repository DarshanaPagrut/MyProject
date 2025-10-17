<template>
  <v-footer class="py-6" :color="$vuetify.theme.dark ? '#0D1117' : 'surface'">
    <v-container class="text-center">
      <p class="mb-0 text-body-2" :class="textSecondaryColor">
        &copy; {{ new Date().getFullYear() }} AlumniLink. All Rights Reserved.
      </p>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'TheFooter',
  computed: {
    textSecondaryColor() {
       return this.$vuetify.theme.dark ? 'textSecondary--text' : 'textSecondary--text';
    }
  }
}
</script>

