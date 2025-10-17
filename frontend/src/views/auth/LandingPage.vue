<template>
  <div style="width: 100%">
    <!-- Navigation Drawer for Mobile -->
    <v-navigation-drawer v-model="drawer" app temporary right>
      <v-list dense nav class="py-5">
        <v-list-item v-for="item in navItems" :key="item.title" @click="scrollTo(item.target)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="my-3"></v-divider>

        <v-list-item class="px-6">
           <v-btn block text color="primary" class="font-weight-bold">Login</v-btn>
        </v-list-item>
        <v-list-item class="px-6">
           <v-btn block depressed :style="{ background: gradient, color: 'white' }" class="font-weight-bold">Register</v-btn>
        </v-list-item>
         <v-list-item class="mt-4 d-flex justify-center">
            <v-switch
              v-model="$vuetify.theme.dark"
              inset
              hide-details
              label="Dark Mode"
              color="secondary"
            ></v-switch>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main App Bar -->
    <v-app-bar app fixed flat elevate-on-scroll :color="$vuetify.theme.dark ? 'surface' : 'white'" class="px-md-4">
       <v-toolbar-title class="font-weight-bold text-h5" :style="gradientTextStyle" @click="scrollTo('#home')" style="cursor: pointer;">
        AlumniLink
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation Buttons -->
      <div class="hidden-sm-and-down">
        <v-btn v-for="item in navItems" :key="item.title" text @click="scrollTo(item.target)" class="font-weight-bold mx-1" :class="textColor.slice(0, -5)">
          {{ item.title }}
        </v-btn>
        <v-btn text color="primary" class="font-weight-bold ml-2" :to="{ name: 'Login' }">Login</v-btn>
        <v-btn depressed :style="{ background: gradient, color: 'white' }" class="font-weight-bold ml-2 rounded-lg" :to="{ name: 'Register' }">Register</v-btn>
         <v-switch
          v-model="$vuetify.theme.dark"
          inset
          hide-details
          color="secondary"
          class="ml-4"
        ></v-switch>
      </div>

      <!-- Mobile Menu Icon -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
    </v-app-bar>

    <!-- Hero Section -->
    <section id="home" :style="{ background: gradient }" class="d-flex align-center" style="min-height: 100vh;">
      <v-container class="text-center white--text py-16">
        <v-row align="center" justify="center">
          <v-col cols="12" md="10" lg="8">
            <h1 class="text-h4 text-sm-h3 text-md-h2 font-weight-bold mb-4">
              Connecting generations of excellence, one bond at a time.
            </h1>
            <p class="text-h6 font-weight-light" :style="{ opacity: 0.9 }">
              The ultimate platform to bridge the gap between alumni, students, and your institution.
            </p>
            <div class="mt-8">
              <v-btn x-large color="accent" class="black--text font-weight-bold ma-2 rounded-lg" depressed>
                <v-icon left>mdi-account-tie</v-icon>
                Join as Alumni
              </v-btn>
              <v-btn x-large outlined dark class="font-weight-bold ma-2 rounded-lg">
                 <v-icon left>mdi-school</v-icon>
                Join as Student
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- About Section -->
    <section id="about" class="py-16">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h4 font-weight-bold mb-3" :class="textColor">{{ 'What is AlumniLink?'.toUpperCase() }}</h2>
            <div class="mx-auto" :style="{ height: '4px', width: '80px', background: gradient }"></div>
            <p class="text-body-1 mt-6" :class="textSecondaryColor">
              AlumniLink is a comprehensive management platform designed to build a powerful and engaged community for your institution. We provide a dedicated space for alumni to reconnect, students to find mentors, and the institute to foster lifelong relationships. It's more than a network; it's a thriving ecosystem for growth, support, and shared success by creating a strong alumni and student community.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-16" :style="{ backgroundColor: $vuetify.theme.themes[theme].surface }">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <h2 class="text-h4 font-weight-bold mb-3" :class="textColor">{{ 'A Platform Built for Connection'.toUpperCase() }}</h2>
            <div class="mx-auto" :style="{ height: '4px', width: '80px', background: gradient }"></div>
          </v-col>
        </v-row>
        
        <v-tabs v-model="tab" centered background-color="transparent" class="mt-8">
          <v-tab class="font-weight-bold">For Alumni</v-tab>
          <v-tab class="font-weight-bold">For Students</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="mt-8" style="background-color: transparent;">
          <!-- Alumni Features -->
          <v-tab-item>
            <v-row>
              <v-col v-for="feature in alumniFeatures" :key="feature.title" cols="12" sm="6" md="4">
                <v-card class="text-center pa-6 fill-height rounded-xl" flat :color="$vuetify.theme.dark ? '#1E2430' : 'white'" outlined>
                  <v-icon x-large :style="gradientTextStyle">{{ feature.icon }}</v-icon>
                  <h3 class="text-h6 font-weight-bold mt-4 mb-2" :class="textColor">{{ feature.title }}</h3>
                  <p class="text-body-2" :class="textSecondaryColor">{{ feature.desc }}</p>
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>

          <!-- Student Features -->
          <v-tab-item>
            <v-row>
              <v-col v-for="feature in studentFeatures" :key="feature.title" cols="12" sm="6" md="4">
                <v-card class="text-center pa-6 fill-height rounded-xl" flat :color="$vuetify.theme.dark ? '#1E2430' : 'white'" outlined>
                   <v-icon x-large :style="gradientTextStyle">{{ feature.icon }}</v-icon>
                  <h3 class="text-h6 font-weight-bold mt-4 mb-2" :class="textColor">{{ feature.title }}</h3>
                  <p class="text-body-2" :class="textSecondaryColor">{{ feature.desc }}</p>
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </section>

    <the-footer />
  </div>
</template>

<script>
import TheFooter from '@/components/layout/TheFooter.vue';


export default {
  name: 'LandingPage',
  components: {
    TheFooter,
  },
  data: () => ({
    drawer: false,
    navItems: [
      { title: 'About', icon: 'mdi-information-outline', target: '#about' },
      { title: 'Features', icon: 'mdi-star-outline', target: '#features' },
    ],
    tab: 0,
    alumniFeatures: [
      { icon: 'mdi-view-dashboard', title: 'Alumni Dashboard', desc: 'A central hub to manage your profile, connections, and activities.' },
      { icon: 'mdi-chat-processing', title: 'Connect & Network', desc: 'Chat with students and fellow alumni, and schedule online meets for mentorship or networking.' },
      { icon: 'mdi-calendar-star', title: 'College Events', desc: 'Stay updated with the latest happenings and participate in college events.' },
      { icon: 'mdi-cash-multiple', title: 'Give Back', desc: 'Easily donate to college campaigns and support the next generation.' },
      { icon: 'mdi-magnify', title: 'Alumni Directory', desc: 'Find and connect with old friends and new faces from your institution.' },
      { icon: 'mdi-image-multiple', title: 'Relive Memories', desc: 'Access a gallery of images from your graduation years and other events.' },
    ],
    studentFeatures: [
      { icon: 'mdi-school', title: 'Expert Mentorship', desc: 'Connect with experienced alumni in your field for invaluable guidance and career advice.' },
      { icon: 'mdi-video-account', title: 'Schedule Online Meets', desc: 'Arrange one-on-one video calls with alumni for mentorship sessions.' },
      { icon: 'mdi-magnify', title: 'Powerful Directory', desc: 'Search for alumni and students with similar interests to build your network.' },
      { icon: 'mdi-account-group', title: 'Build Community', desc: 'Engage with a vibrant community of peers and professionals from your institution.' },
       { icon: 'mdi-card-account-details-outline', title: 'View Profiles', desc: 'Explore the detailed profiles of alumni to find the right mentors and connections.' },
      { icon: 'mdi-lightbulb-on-outline', title: 'Gain Insights', desc: 'Learn from the experiences of those who have walked the path before you.' },
    ],
  }),
  computed: {
     theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light';
    },
    gradient() {
      return this.$vuetify.theme.themes.light.gradient;
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
    textColor() {
      return this.$vuetify.theme.dark ? 'textPrimary--text' : 'textPrimary--text';
    },
    textSecondaryColor() {
      return this.$vuetify.theme.dark ? 'textSecondary--text' : 'textSecondary--text';
    }
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

