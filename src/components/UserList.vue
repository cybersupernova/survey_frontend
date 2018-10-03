<template>
  <v-layout row>
    <v-flex lg12>
      <v-card>
        <v-list>
          <template v-for="(item, index) in items">
            <v-list-tile
              :key="item._id"
			  @click="$router.push({name: 'UserSurveyDetails', params: {userId: item._id, id:item.surveyId}})"
            >
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item._id }}
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
  created() {
    this.$http
      .get(`${this.$env.baseUrl}/users`)
      .then(res => {
        this.items = res.body;
      })
      .catch(res => {
        console.log(res);
      });
  }
};
</script>
