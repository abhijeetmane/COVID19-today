module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "Corona Today",
    themeColor: "#204864",
    msTileColor: "#558CA5",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    // configure the workbox plugin
    workboxPluginMode: "GenerateSW"
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    }
  }
};
