<template>
  <v-layout row>
    <v-flex lg12>
      <v-card>
        <v-list>
          <template v-for="(item, index) in items">
            <v-list-tile
              :key="item.title"
			        @click="$router.push({name: 'UserSurveyDetails', params: {id: item.surveyId}})"
            >
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.title }}
                  <!-- <span class="grey--text text--lighten-1">&mdash; {{ item.attempts }} attempts</span> -->
                </v-list-tile-title>
              </v-list-tile-content>
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
    increaseAttempt(index) {
      this.$set(this.items[index], "attempts", this.items[index].attempts + 1);
    }
  },
  created() {
    this.$http
      .get(`${this.$env.baseUrl}/surveys`)
      .then(res => {
        this.items = res.body;
        console.log(this.items);
      })
      .catch(res => console.log(res));
  }
};
</script>
