<template>
  <v-layout row>
    <v-flex lg12>
      <v-card>
        <v-list>
          <template v-for="(item, index) in items">
            <v-list-tile
              :key="item.title"
              @click="$router.push({name: 'AdminSurveyDetails', params: {id: item.surveyId}})"
            >
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.title }}
                  <span class="grey--text text--lighten-1">&mdash; {{ item.attempts }} attempts</span>
                </v-list-tile-title>
              </v-list-tile-content>
                <v-list-tile-action @click.stop="increaseAttempt(index, item.surveyId)">
                  <v-icon>library_add</v-icon>
                </v-list-tile-action>
            </v-list-tile>
            <v-divider
              :key="index"
              v-if="index<items.length-1"
            ></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    increaseAttempt(index, surveyId) {
      console.log(surveyId);
      this.$http
        .get(`${this.$env.baseUrl}/survey/insert`, {
          params: { surveyId }
        })
        .then(res => {
          if (res.body.length)
            this.$set(
              this.items[index],
              "attempts",
              this.items[index].attempts + 1
            );
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.$http
      .get(`${this.$env.baseUrl}/surveys`)
      .then(res => {
        this.items = res.body;
      })
      .catch(res => console.log(res));
  }
};
</script>
