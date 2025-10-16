<template>
  <v-app :style="appStyles">
    <!-- Navigation Drawer for Mobile -->
    <v-navigation-drawer v-model="drawer" app temporary :right="$vuetify.rtl">
      <v-list dense nav>
        <v-list-item v-for="item in navItems" :key="item.title" @click="scrollTo(item.target)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <v-list-item>
           <v-btn text color="primary" class="font-weight-bold">Login</v-btn>
        </v-list-item>
        <v-list-item>
           <v-btn depressed :style="{ background: gradient, color: 'white' }" class="font-weight-bold">Register</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main App Bar -->
    <v-app-bar app flat absolute :color="$vuetify.theme.dark ? 'surface' : 'white'">
       <v-toolbar-title class="font-weight-bold" :style="gradientTextStyle" @click="scrollTo('#home')" style="cursor: pointer;">
        AlumniLink
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation Buttons -->
      <div class="hidden-sm-and-down">
        <v-btn v-for="item in navItems" :key="item.title" text @click="scrollTo(item.target)" class="font-weight-bold mx-1">
          {{ item.title }}
        </v-btn>
        <v-btn text color="primary" class="font-weight-bold ml-2">Login</v-btn>
        <v-btn depressed :style="{ background: gradient, color: 'white' }" class="font-weight-bold ml-2">Register</v-btn>
      </div>

       <v-switch
        v-model="$vuetify.theme.dark"
        inset
        hide-details
        color="secondary"
        class="ml-4"
      ></v-switch>

      <!-- Mobile Menu Icon -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    navItems: [
      { title: 'About', icon: 'mdi-information-outline', target: '#about' },
      { title: 'Features', icon: 'mdi-star-outline', target: '#features' },
    ],
  }),
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light';
    },
    gradient() {
       return this.$vuetify.theme.themes.light.gradient;
    },
    appStyles() {
      return {
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: this.$vuetify.theme.themes[this.theme].background,
        color: this.$vuetify.theme.themes[this.theme].textPrimary,
        transition: 'background-color 0.3s ease'
      };
    },
    gradientTextStyle() {
      return {
        background: this.gradient,
        '-webkit-background-clip': 'text',
        '-moz-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        '-moz-text-fill-color': 'transparent',
      };
    },
  },
  methods: {
    scrollTo(target) {
      this.drawer = false; // Close drawer on mobile after click
      this.$vuetify.goTo(target, {
        duration: 500,
        easing: 'easeInOutCubic',
      });
    },
  },
};
</script>

