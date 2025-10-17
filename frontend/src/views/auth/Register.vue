<template>
  <v-container fluid class="fill-height pa-0">
    <v-row align="center" justify="center" no-gutters class="fill-height">
      <!-- On medium screens and up, show an image on the left -->
      <v-col md="6" lg="7" class="d-none d-md-flex fill-height pa-0">
        <v-img
          src="https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          cover
          class="fill-height"
        >
          <div class="d-flex flex-column fill-height justify-center align-center text-center pa-8" style="background: rgba(0, 146, 255, 0.7);">
            <v-icon size="80" color="white" class="mb-4">mdi-account-group</v-icon>
            <h1 class="text-h2 font-weight-bold white--text mb-4" style="text-shadow: 1px 1px 3px rgba(0,0,0,0.3);">
              Join Our Network
            </h1>
            <p class="text-h5 font-weight-light white--text" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">
              Create your account to connect with peers and mentors.
            </p>
          </div>
        </v-img>
      </v-col>

      <!-- Registration Form Column -->
      <v-col cols="12" md="6" lg="5" class="d-flex justify-center align-center py-8">
        <v-card 
          flat
          class="mx-auto pa-sm-8 pa-4" 
          max-width="500"
          width="100%"
        >
          <v-card-title class="justify-center pt-4 pb-2">
            <div class="text-center">
               <div class="d-flex d-md-none align-center justify-center mb-4">
                <v-icon size="48" color="primary">
                  mdi-school
                </v-icon>
              </div>
              <h2 class="primary--text text-h4 font-weight-bold" :style="gradientTextStyle">
                Create Account
              </h2>
              <p class="text-secondary mt-1">
                Let's get you started!
              </p>
            </div>
          </v-card-title>
          
          <v-card-text class="px-4 pb-4">
            <v-form ref="form" v-model="valid" @submit.prevent="handleRegister" class="mt-4">
              <!-- Role Selection -->
              <v-select
                v-model="selectedRole"
                :items="roles"
                item-text="label"
                item-value="value"
                label="I am a..."
                outlined
                prepend-inner-icon="mdi-account-group-outline"
                class="mb-3"
                required
              />

              <!-- Dynamic Form Fields -->
              <div v-show="selectedRole">
                <!-- Name Row -->
                <v-row dense>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.firstName"
                      :rules="nameRules"
                      label="First Name"
                      prepend-inner-icon="mdi-account-outline"
                      outlined
                      dense
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.lastName"
                      :rules="nameRules"
                      label="Last Name"
                      prepend-inner-icon="mdi-account-outline"
                      outlined
                      dense
                      required
                    />
                  </v-col>
                </v-row>

                <!-- Email -->
                <v-text-field
                  v-model="form.email"
                  :rules="emailRules"
                  label="Email"
                  type="email"
                  prepend-inner-icon="mdi-email-outline"
                  outlined
                  dense
                  class="mb-3"
                  required
                />

                <!-- Password Row -->
                <v-row dense>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.password"
                      :rules="passwordRules"
                      :type="showPassword ? 'text' : 'password'"
                      label="Password"
                      prepend-inner-icon="mdi-lock-outline"
                      :append-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                      @click:append="showPassword = !showPassword"
                      outlined
                      dense
                      required
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.confirmPassword"
                      :rules="confirmPasswordRules"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      label="Confirm Password"
                      prepend-inner-icon="mdi-lock-check-outline"
                      :append-icon="showConfirmPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                      @click:append="showConfirmPassword = !showConfirmPassword"
                      outlined
                      dense
                      required
                    />
                  </v-col>
                </v-row>

                <!-- Alumni specific fields -->
                <template v-if="selectedRole === 'alumni'">
                  <v-select
                    v-model="form.graduationYear"
                    :items="alumniYears"
                    :rules="yearRules"
                    label="Graduation Year / Batch"
                    prepend-inner-icon="mdi-calendar-check-outline"
                    outlined
                    dense
                    class="mt-3"
                    required
                  />
                  <v-select
                    v-model="form.branch"
                    :items="branches"
                    :rules="branchRules"
                    label="Branch / Department"
                    prepend-inner-icon="mdi-school-outline"
                    outlined
                    dense
                    required
                  />
                </template>

                <!-- Student specific fields -->
                <template v-if="selectedRole === 'student'">
                  <v-select
                    v-model="form.yearOfStudy"
                    :items="studentYears"
                    :rules="yearRules"
                    label="Year of Study / Batch"
                    prepend-inner-icon="mdi-calendar-outline"
                    outlined
                    dense
                    class="mt-3"
                    required
                  />
                  <v-select
                    v-model="form.branch"
                    :items="branches"
                    :rules="branchRules"
                    label="Branch / Department"
                    prepend-inner-icon="mdi-school-outline"
                    outlined
                    dense
                    required
                  />
                  <v-text-field
                    v-model="form.collegeId"
                    label="College ID (optional)"
                    prepend-inner-icon="mdi-card-account-details-outline"
                    outlined
                    dense
                  />
                  <v-text-field
                    v-model="form.linkedinUrl"
                    label="LinkedIn URL (optional)"
                    prepend-inner-icon="mdi-linkedin"
                    outlined
                    dense
                  />
                </template>

                <!-- Submit Button -->
                <v-btn
                  :loading="loading"
                  :disabled="!valid"
                  type="submit"
                  :style="{ background: gradient, color: 'white' }"
                  block
                  x-large
                  class="mt-4 mb-3 rounded-lg font-weight-bold"
                >
                  Register
                </v-btn>

                <!-- Login Link -->
                <div class="text-center">
                  <span class="text-body-2 text-secondary">Already have an account?</span>
                  <v-btn
                    text
                    small
                    color="primary"
                    :to="{ name: 'Login' }"
                    class="text-decoration-underline ml-1 text-body-2 font-weight-bold pa-1"
                  >
                    Login
                  </v-btn>
                </div>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
/* eslint-disable */
export default {
  name: 'RegisterPage',
  data() {
  return {
    valid: false,
    loading: false,
    showPassword: false,
    showConfirmPassword: false,
    selectedRole: '',
    form: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      graduationYear: '',
      yearOfStudy: '',
      branch: '',
      linkedinUrl: '',
      collegeId: ''
    },
    roles: [
      { label: 'Alumni', value: 'alumni' },
      { label: 'Student', value: 'student' }
    ],
    alumniYears:[
      '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
      '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022',
      '2023', '2024', '2025'
    ],
    studentYears:[
      'First Year',
      'Second Year',
      'Third Year',
      'Final Year'
    ],
    branches: [
      'Computer Engineering',
      'Information Technology',
      'Electronics Engineering',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Electronics and Telecommunication Engineering',
      'Aerospace Engineering',
      'Chemical Engineering',
      'Biomedical Engineering'
    ],
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length >= 2) || 'Name must be at least 2 characters'
    ],
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'Email must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must be at least 8 characters',
      v => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(v) || 'Password must contain uppercase, lowercase and a number'
    ],
    yearRules: [
      v => !!v || 'This field is required'
    ],
    branchRules: [
      v => !!v || 'Branch is required'
    ]
  }
},
  
  computed: {
    confirmPasswordRules() {
      return [
        v => !!v || 'Please confirm your password',
        v => v === this.form.password || 'Passwords do not match'
      ]
    },
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
    async handleRegister() {
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          const userData = {
            name: `${this.form.firstName} ${this.form.lastName}`,
            email: this.form.email,
            password: this.form.password,
            role: this.selectedRole,
            college_id: this.form.collegeId,
            year_of_study: this.form.yearOfStudy,
            branch: this.form.branch,
            graduation_year: this.form.graduationYear,
            linkedin_url: this.form.linkedinUrl
          }
          
          // In a real app, you would dispatch an action to call your backend API
          // For now, we'll simulate a login and redirect
          await this.$store.dispatch('login', {
            email: userData.email,
            role: userData.role,
            name: userData.name
          })
          
          // Redirect based on role
          if (this.selectedRole === 'alumni') {
            this.$router.push('/alumni/dashboard')
          } else {
            this.$router.push('/student/dashboard')
          }
        } catch (error) {
          console.error('Registration failed:', error)
        } finally {
          this.loading = false
        }
      }
    }
  },
  watch: {
    selectedRole(newRole) {
      // Reset form when role changes, except for common fields
      const commonFields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
      Object.keys(this.form).forEach(key => {
        if (!commonFields.includes(key)) {
          this.form[key] = ''
        }
      });
      // Reset validation if the form was already validated
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
    }
  }
}
</script>

