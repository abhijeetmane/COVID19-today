<template>
  <v-container class="nav-bar">
    <v-app-bar color="transparent" elevation="0">
      <v-tabs right slider-color="white" slider-size="1">
        <v-tab v-for="tab in tabs" :key="tab.name" :to="tab.path">
          <span class="white--text nav-tab" :class="`lang-${selectedLang}`">{{
            $t(tab.name)
          }}</span>
        </v-tab>
      </v-tabs>
      <v-menu
        origin="center center"
        transition="scale-transition"
        bottom
        left
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn dark icon v-on="on" class="ma-1">
            <v-icon size="20">mdi-translate</v-icon>
            <span class="white--text lang-code">{{ selectedLang }} </span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in languages"
            :key="item.i18code"
            @click="switchLanguage(item)"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-container>
</template>
<script>
export default {
  name: "NavBar",
  data: function() {
    return {
      selectedLang: this.$i18n.locale.toUpperCase(),
      languages: [
        {
          code: "EN",
          name: "English",
          i18code: "en"
        },
        {
          code: "NL",
          name: "Nederlands",
          i18code: "nl"
        },
        {
          code: "DE",
          name: "German",
          i18code: "de"
        },
        {
          code: "FR",
          name: "Français",
          i18code: "fr"
        },
        {
          code: "ES",
          name: "Español",
          i18code: "es"
        },
        {
          code: "MR",
          name: "मराठी",
          i18code: "mr"
        },
        {
          code: "TA",
          name: "தமிழ்",
          i18code: "ta"
        },
        {
          code: "HI",
          name: "हिन्दी",
          i18code: "hi"
        }
      ],
      tabs: [
        {
          name: "Home",
          path: "/"
        },
        {
          name: "Graphs",
          path: "/graphs"
        },
        {
          name: "News",
          path: "/news"
        }
      ]
    };
  },
  methods: {
    switchLanguage: function(item) {
      this.selectedLang = item.code;
      this.$i18n.locale = item.i18code;
      window.localStorage.setItem("i18code", item.i18code);

      /*Change left and width of side bar below active tab*/
      setTimeout(function() {
        const activeTabElm = document.querySelectorAll(".v-tab--active")[0];
        const activeTabElmLeft = activeTabElm.offsetLeft;
        const activeTabWidth = activeTabElm.offsetWidth;
        let sideBarElm = document.querySelectorAll(".v-tabs-slider-wrapper")[0];
        const sidebarLeft = parseInt(activeTabElmLeft);
        sideBarElm.style.left = `${sidebarLeft}px`;
        sideBarElm.style.width = `${activeTabWidth}px`;
      });
    }
  }
};
</script>

<style lang="scss">
.nav-bar.container {
  padding-top: 0;
  .lang-code {
    font-size: 10px;
  }
  .v-toolbar__content {
    padding: 0;
  }
  .v-slide-group__prev {
    display: none !important;
  }
  .v-btn:not(.v-btn--text):not(.v-btn--outlined):focus:before,
  .v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before {
    opacity: 0;
  }
}

@media screen and (max-width: 321px) {
  .v-slide-group__content.v-tabs-bar__content {
    .v-tab {
      padding: 0;
      margin: 0;
    }
  }
  .nav-tab {
    font-size: 8px;
    &.lang-MR,
    &.lang-TA,
    &.lang-HI,
    &.lang-EN,
    &.lang-ES {
      font-size: 12px;
    }
    &.lang-FR,
    &.lang-DE {
      font-size: 10px;
    }
  }
}

@media screen and (min-width: 321px) and (max-width: 374px) {
  .v-slide-group__content.v-tabs-bar__content {
    .v-tab {
      padding: 0;
      margin: 0;
    }
  }
  .nav-tab {
    font-size: 10px;
    &.lang-MR,
    &.lang-TA,
    &.lang-HI,
    &.lang-EN,
    &.lang-ES {
      font-size: 12px;
    }
    &.lang-FR,
    &.lang-DE {
      font-size: 10px;
    }
  }
}
@media screen and (min-width: 375px) and (max-width: 600px) {
  .nav-tab {
    font-size: 12px;
  }
}
</style>
