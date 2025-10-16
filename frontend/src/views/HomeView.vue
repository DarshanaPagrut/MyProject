<template>
  <div class="fill-height" style="width: 100%">
    <!-- Section 1: Gradient Hero -->
    <div class="bg-gradient d-flex align-center justify-center" style="min-height: 40vh;">
      <v-container class="text-center">
        <h1 class="text-h3 font-weight-bold white--text mb-4">
          Welcome to Your Gradient App
        </h1>
        <p class="text-subtitle-1 white--text" style="opacity: 0.8">
          A consistent global theme powered by Vuetify
        </p>
        <v-btn
          class="white--text font-weight-bold mt-6"
          color="accent"
          depressed
          x-large
          dark
        >
          Get Started
        </v-btn>
      </v-container>
    </div>

    <!-- Section 2: Content Area -->
    <v-container class="pa-6 pa-md-12">
      <v-row>
        <v-col cols="12" class="text-center">
           <h2 class="text-h4 font-weight-bold mb-4" :class="{'grey--text text--darken-3': !$vuetify.theme.dark, 'white--text': $vuetify.theme.dark}">
            Theme in Action
          </h2>
        </v-col>
         <v-col md="4" cols="12">
          <v-card class="pa-4" :color="$vuetify.theme.dark ? 'surface' : 'white'" outlined>
            <v-card-title class="text-gradient font-weight-bold">
              Primary Card
            </v-card-title>
            <v-card-text :class="{'grey--text text--darken-2': !$vuetify.theme.dark, 'textSecondary--text': $vuetify.theme.dark}">
              This card uses your theme's primary text color and a surface background.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="primary">Learn More</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="4" cols="12">
          <v-card class="pa-4" :color="$vuetify.theme.dark ? 'surface' : 'white'" outlined>
             <v-card-title class="secondary--text font-weight-bold">
              Secondary Card
            </v-card-title>
            <v-card-text :class="{'grey--text text--darken-2': !$vuetify.theme.dark, 'textSecondary--text': $vuetify.theme.dark}">
              This card uses your theme's secondary text color for its title.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="secondary">Explore</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
         <v-col md="4" cols="12">
          <v-card class="pa-4" :color="$vuetify.theme.dark ? 'surface' : 'white'" outlined>
            <v-card-title class="accent--text font-weight-bold">
              Accent Card
            </v-card-title>
             <v-card-text :class="{'grey--text text--darken-2': !$vuetify.theme.dark, 'textSecondary--text': $vuetify.theme.dark}">
              And this one uses the accent color, perfect for calls to action.
            </v-card-text>
             <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="accent">Discover</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>
