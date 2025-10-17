<template>
  <v-app>
    <v-main class="background">
      <router-view />
    </v-main>
    <the-footer />
  </v-app>
</template>

<script>
import TheFooter from '@/components/layout/TheFooter.vue'

export default {
  name: 'AuthLayout',
  components: {
    TheFooter
  }
}
</script>
