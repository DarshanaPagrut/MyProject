<template>
  <v-container fluid class="fill-height pa-0">
    <v-row align="center" justify="center" no-gutters class="fill-height">
      <!-- On medium screens and up, show an image on the left -->
      <v-col md="6" lg="7" class="d-none d-md-flex fill-height pa-0">
        <v-img
          src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          cover
          class="fill-height"
        >
          <div class="d-flex flex-column fill-height justify-center align-center text-center pa-8" style="background: rgba(0, 146, 255, 0.7);">
            <v-icon size="80" color="white" class="mb-4">mdi-school</v-icon>
            <h1 class="text-h2 font-weight-bold white--text mb-4" style="text-shadow: 1px 1px 3px rgba(0,0,0,0.3);">
              Welcome Back
            </h1>
            <p class="text-h5 font-weight-light white--text" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">
              Connecting generations of excellence, one bond at a time.
            </p>
          </div>
        </v-img>
      </v-col>

      <!-- Login Form Column -->
      <v-col cols="12" md="6" lg="5" class="d-flex justify-center align-center">
        <v-card 
          flat
          class="mx-auto pa-sm-8 pa-4" 
          max-width="450"
          width="100%"
        >
          <v-card-title class="justify-center pt-4 pb-2">
            <div class="text-center">
              <div class="d-flex d-md-none align-center justify-center mb-4">
                <v-icon size="48" color="primary" :style="gradientTextStyle">
                  mdi-school
                </v-icon>
              </div>
              <h2 class="primary--text text-h4 font-weight-bold" :style="gradientTextStyle">
                AlumniLink
              </h2>
              <p class="text-secondary mt-1">
                Sign in to continue
              </p>
            </div>
          </v-card-title>
          
          <v-card-text class="px-4 pb-4">
            <v-form ref="form" v-model="valid" @submit.prevent="handleLogin" class="mt-4">
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                label="Email"
                type="email"
                prepend-inner-icon="mdi-email-outline"
                outlined
                class="mb-3"
                required
              />
              
              <v-text-field
                v-model="form.password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                prepend-inner-icon="mdi-lock-outline"
                :append-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append="showPassword = !showPassword"
                outlined
                class="mb-2"
                required
              />
              
              <div class="d-flex justify-space-between align-center mb-4">
                <v-checkbox
                  v-model="form.rememberMe"
                  label="Remember me"
                  dense
                  hide-details
                  class="mt-0 pt-0"
                />
                
                <v-btn
                  text
                  small
                  color="primary"
                  class="text-capitalize text-decoration-underline pa-0"
                >
                  Forgot Password?
                </v-btn>
              </div>
              
              <v-btn
                :loading="loading"
                :disabled="!valid"
                type="submit"
                :style="{ background: gradient, color: 'white' }"
                block
                x-large
                class="mb-4 rounded-lg font-weight-bold"
              >
                Login
              </v-btn>
              
              <div class="text-center">
                <span class="text-body-2" :class="textSecondaryColor">
                  Don't have an account?
                </span>
                <v-btn
                  text
                  small
                  :style="gradientTextStyle"
                  :to="{ name: 'Register' }"
                  class="text-decoration-underline ml-1 text-body-2 font-weight-bold pa-1"
                >
                  Register here
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      valid: false,
      loading: false,
      showPassword: false,
      form: {
        email: '',
        password: '',
        rememberMe: false
      },
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be at least 6 characters'
      ]
    }
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light';
    },
    gradient() {
      return this.$vuetify.theme.themes[this.theme].gradient;
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
    textSecondaryColor() {
      return this.$vuetify.theme.dark ? 'textSecondary--text' : 'textSecondary--text';
    }
  },
  methods: {
    async handleLogin() {
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          // Simulate login - determine role based on email domain or hardcoded for demo
          let role = 'student' // default
          if (this.form.email.includes('admin')) role = 'admin'
          else if (this.form.email.includes('alumni')) role = 'alumni'
          
          const userData = {
            email: this.form.email,
            role: role,
            name: this.form.email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase()) // Capitalize name
          }
          
          await this.$store.dispatch('login', userData)
          
          // Redirect based on role
          if (role === 'admin') {
            this.$router.push('/admin/dashboard')
          } else if (role === 'alumni') {
            this.$router.push('/alumni/dashboard')
          } else {
            this.$router.push('/student/dashboard')
          }
        } catch (error) {
          console.error('Login failed:', error)
          // Here you would show an error message to the user
        } finally {
          this.loading = false
        }
      }
    }
  }
}
</script>
