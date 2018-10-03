<script>
export default {
  data() {
    return {
      questions: [],
      results: {},
      survey: {}
    };
  },
  methods: {
    getPercentage(value) {
      return parseInt((value / this.survey.attempts) * 100);
    }
  },
  created() {
    this.$http
      .get(`${this.$env.baseUrl}/survey/report/admin`, {
        params: { surveyId: this.$route.params.id }
      })
      .then(res => {
        this.questions = res.body.questions;
        this.results = res.body.report;
        this.survey = res.body.survey;
      })
      .catch(res => console.log(res));
  }
};
</script>

<template>
	<v-layout row wrap>
    <v-flex pa-2 lg12>
      <h2>{{ survey.title }} &mdash; {{ survey.attempts }} attempts</h2>
    </v-flex>
		<v-flex v-for="(question, index) in questions" pa-2 lg12 :key="index">
      <v-card lg12>
          <v-card-title :key="question.question">
            <h3 class="headline mb-0">Q{{ index + 1 }} &mdash; {{ question.question }}</h3>
            <div>Type &mdash; {{ question.type }}</div>
          </v-card-title>
	        <v-layout row wrap>
            <v-flex v-for="(option, index) in question.options" v-if="question.type !== 'ol'" :key="index">
              <div class="option-holder">
                <div class="option">
                {{ option.text }}
                </div>
                <v-progress-circular
                  :rotate="360"
                  :size="100"
                  :width="15"
                  :value="getPercentage(results.questions[question.questionId][option.id])"
                  color="teal"
                >
                {{ getPercentage(results.questions[question.questionId][option.id]) }}%
                </v-progress-circular>
                <v-chip class="option-count">
                  {{ results.questions[question.questionId][option.id] }}/{{ survey.attempts }}
                </v-chip>
              </div>
            </v-flex>
	        </v-layout>
          <v-divider :key="'d'+index"></v-divider>
      </v-card>
		</v-flex>
	</v-layout>
</template>

<style>
.option-holder {
  text-align: center;
  padding: 10px;
  border: 1px solid teal;
  position: relative;
}
.option-count {
  position: absolute;
  bottom: 0;
  right: 0;
}
.headline {
  width: 100%;
}
</style>
