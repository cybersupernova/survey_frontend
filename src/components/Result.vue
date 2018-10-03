<script>
export default {
  data() {
    return {
      questions: [],
      result: []
    };
  },
  methods: {
    getPercentage(value) {
      return parseInt((value / this.attempts) * 100);
    },
    isAnswered(questionId, optionId) {
      let answer = this.result.filter(
        el => questionId == el.questionId && el.answer == optionId
      );
      if (answer.length) {
        return true;
      }
      return false;
    },
    getOneLineAnswer(questionId) {
      let answer = this.result.filter(el => questionId === el.questionId);
      if (answer.length) {
        return answer[0].answer;
      }
      return "";
    }
  },
  created() {
    this.$http
      .get(`${this.$env.baseUrl}/survey/report/user`, {
        params: {
          surveyId: this.$route.params.id,
          userId: this.$route.params.userId
        }
      })
      .then(res => {
        this.questions = res.body.questions;
        this.result = res.body.report;
      });
  }
};
</script>

<template>
	<v-layout row wrap>
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
                <v-icon color="green" v-if="isAnswered(question.questionId, option.id)">check</v-icon>
                </div>
              </div>
            </v-flex>
            <v-flex v-if="question.type === 'ol'">
              <div class="option-holder">
                <div class="option">
                {{ getOneLineAnswer(question.questionId) }}
                </div>
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
}
.headline {
  width: 100%;
}
</style>
