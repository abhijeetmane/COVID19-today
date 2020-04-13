<template>
  <div class="graphs-container">
    <div class="mb-2">
      <v-icon size="24" class="icon-close" @click="closeFaq">mdi-close</v-icon>
      <h4 class="d-flex justify-center">
        Frequently Asked Questions &nbsp;&nbsp;
        <v-icon size="24">mdi-head-question</v-icon>
      </h4>
    </div>
    <v-row class="justify-center align-center faq-box">
      <v-col
        class="d-flex justify-start align-start"
        v-for="(item, i) in items"
        :key="i"
        cols="12"
      >
        <div>
          <div><span v-html="item.title"></span></div>
          <div><span v-html="item.subtitle"></span></div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: "<b>Is this official site for coronavirus information?</b>",
        subtitle:
          "No. We are just displaying information available at different sources."
      },

      {
        title: "<b>What are your sources of information?</b>",
        subtitle: `<ul><li><a target="_blank" href="https://documenter.getpostman.com/view/8854915/SzS7R6uu?version=latest">NovelCOVID API</a> - An API for current cases and more information about COVID-19.</li>
        <li><a target="_blank" href="https://documenter.getpostman.com/view/10724784/SzYXXKmA?version=latest">COVID19-India API</a> - 
        An API for COVID-19 stats & patient tracing in India (Unofficial).</li>
        <li><a href="https://newsapi.org/docs/get-started" target="_blank">NewsAPI.org</a> - An API for retrieving live articles from all over the web.</li></ul>`
      },

      {
        title: `<b>Why does <a href="https://thecovid19.today/">thecovid19.today</a> has different count than other websites/sources?</b>`,
        subtitle:
          "Sources used to gather information updates data at scheduled time and it may be different than other websites."
      },

      {
        title: "<b>Do you keep personal information of users/patients?</b>",
        subtitle:
          "This is open source project created to help community. We never collect or expose any personally identifiable data regarding the users and patients?"
      },

      {
        title: "<b>How can I contribute to this project?</b>",
        subtitle: `More information regarding this is available <b><a target="_blank" href="https://github.com/abhijeetmane/COVID19-today/blob/master/README.md">here</a></b>`
      },
      {
        title:
          "<b>Where can I find useful information regarding Corona virus?</b>",
        subtitle: `We have collected some useful links for your information. 
        <br><ul>
        <li><a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public" target="_blank">WHO - Advice for public</a></li>
        <li><a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html" target="_blank">How to Protect Yourself & Others</a></li>
        <li><a href="https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/steps-when-sick.html" target="_blank">What to Do if You Are Sick</a></li>
        <li><a href="https://www.unicef.org/parenting/coronavirus-covid-19-guide-parents" target="_blank">Q & A on COVID-19</a></li>
        <li><a href="https://www.ecdc.europa.eu/en/covid-19/questions-answers" target="_blank">Guide for parents</a></li>
        </ul>`
      }
    ]
  }),
  methods: {
    closeFaq: function() {
      this.$router.push({ name: "Home" });
    }
  },
  mounted() {
    this.$gtag.pageview({
      page_title: "Faq",
      page_path: "/faq"
    });
  }
};
</script>

<style lang="scss" scoped>
.graphs-container {
  padding-top: 20px;
  margin: 10px 3% 0 3%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(36, 37, 38, 0.3);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
  .icon-close {
    float: right;
    margin-right: 3%;
  }
  .faq-box {
    margin: 0 auto;
    width: 90%;
    height: 100%;
  }
}

@media screen and (min-width: 992px) {
  .graphs-container {
    margin-top: 20px;
    height: calc(100vh - 164px);
    overflow-y: auto;
    overflow-x: hidden;
    .faq-box {
      margin: 0 auto;
      width: 65%;
    }
  }
}
</style>
