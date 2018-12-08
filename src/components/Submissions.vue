<template>
  <div class="app">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
  <div id="table">
    <v-client-table :columns="columns" :data="submissions" :options="options">
    </v-client-table>
  </div>
  </div>
</template>

<script>
import SubmissionServices from '@/services/SubmissionServices'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Submissions',
  data () {
    return {
      messagetitle: 'submissions',
      submissions: [],
      errors: [],
      columns: ['_id', 'name', 'age', 'gender', 'startWeight', 'goalWeight', 'currentWeight', 'height', 'location', 'date'],
      options: {
        headings: {
          name: 'Name',
          age: 'Age',
          gender: 'Gender',
          startWeight: 'Start Weight',
          goalWeight: 'Goal Weight',
          currentWeight: 'Current Weight',
          height: 'Height',
          location: 'Location',
          date: 'Date'
        }
      }
    }
  },
  created () {
    this.loadsubs()
  },
  methods: {
    loadsubs: function () {
      SubmissionServices.getsubs()
        .then(reponse => {
          this.submissions = reponse.data
          console.log(this.submissions)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  }

}
</script>

<style scoped>
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
  #table{
    width: 60%;
    margin: 0 auto;
  }
</style>
