import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const gradient = 'linear-gradient(90deg, #0092FF, #00D4B4, #00FFAA)';

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    options: {
      customProperties: true, // allows using CSS vars like var(--v-primary-base)
    },
    themes: {
      light: {
        primary: '#0092FF',
        secondary: '#00D4B4',
        accent: '#00FFAA',
        // Custom properties for use in CSS
        gradient: gradient,
        background: '#FFFFFF',
        surface: '#F8FAFC',
        textPrimary: '#000000',
        textSecondary: '#555555',
        // Standard properties
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
      dark: {
        primary: '#0092FF',
        secondary: '#00D4B4',
        accent: '#00FFAA',
        // Custom properties for use in CSS
        gradient: gradient,
        background: '#0D1117',
        surface: '#1E2430',
        textPrimary: '#FFFFFF',
        textSecondary: '#AAAAAA',
        // Standard properties
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
});
