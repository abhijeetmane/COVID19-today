import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.blue.lighten1,
        secondary: colors.red.lighten4,
        accent: colors.indigo.base
      }
    }
  }
});
