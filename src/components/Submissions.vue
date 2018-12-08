<template>
  <div class="app">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
  <div id="table">
    <v-client-table :columns="columns" :data="submissions" :options="options">
      <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editDonation(props.row._id)"></a>
      <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteSubmission(props.row._id)"></a>
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
      columns: ['_id', 'name', 'age', 'gender', 'startWeight', 'goalWeight', 'currentWeight', 'height', 'location', 'date', 'edit', 'remove'],
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
    },
    editDonation: function (id) {
      this.$router.params = id
      this.$router.push('edit')
    },
    deleteSubmission: function (id) {
      this.$swal({
        title: 'Are you totaly sure?',
        text: 'You can\'t Undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete it',
        cancelButtonText: 'Cancel',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL RESULT: ' + result)
        if (result.value === false) {
          this.$swal('Cancelled', 'Your Donation still Counts!', 'info')
        } else {
          SubmissionServices.deleteSubmission(id)
            .then(response => {
              this.name = response.data
              console.log(this.name)
              this.loadsubs()
              this.$swal('this been deleted fam' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        }
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
