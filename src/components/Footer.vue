<template>
  <div>
    <v-footer dark padless class="app-footer black">
      <v-btn
        class="white--text black app-footer__btn"
        :key="icon.key"
        v-for="icon in options"
        :href="icon.link"
        :target="icon.target"
        icon
        @click="handleFooterClick(icon.key)"
      >
        <v-icon size="24px" color="grey lighten-1">{{ icon.name }}</v-icon>
      </v-btn>
    </v-footer>
  </div>
</template>
<script>
export default {
  data: () => ({
    options: [
      {
        name: "mdi-github",
        key: "github",
        link:
          "https://github.com/abhijeetmane/COVID19-today/blob/master/README.md",
        target: "_blank"
      },
      {
        name: "mdi-linkedin",
        key: "linkedin",
        link: "https://www.linkedin.com/in/abhijeet-mane-89452820",
        target: "_blank"
      },
      {
        name: "mdi-twitter",
        key: "twitter",
        link: "https://twitter.com/Abhijeetit",
        target: "_blank"
      },
      {
        name: "mdi-gmail",
        key: "gmail",
        link: "mailto:amabhijeetmane@gmail.com?Subject=thecovid19.today",
        target: "_blank"
      },
      {
        name: "mdi-head-question-outline",
        key: "faq",
        link: "/#/faq",
        target: "_self"
      }
    ]
  }),
  methods: {
    handleFooterClick(key) {
      this.$gtag.event("footer_clicked", {
        Action: "click",
        Category: "footer",
        Label: key
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.app-footer {
  margin-top: 20px;
  height: 48px;
  justify-content: center;
  align-items: center;
  display: flex;
  .app-footer__btn {
    margin-right: 16px;
    margin-left: 16px;
  }
  @media screen and (max-width: 340px) {
    .app-footer__btn {
      margin-right: 8px;
      margin-left: 8px;
    }
  }
}
</style>
