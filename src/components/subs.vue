<template>
  <div class="hero">
    <h3 class="vue-title">{{ messagetitle }}</h3>
    <div id="table">
      <v-client-table :columns="columns" :data="subs" :options="options">
        <a
          slot="edit"
          slot-scope="props"
          class="fa fa-edit fa-2x"
          @click="ee(props.row._id)"
        ></a>
        <a
          slot="remove"
          slot-scope="props"
          class="fa fa-trash-o fa-2x"
          @click="deleteSubmission(props.row._id)"
        ></a>
      </v-client-table>
    </div>
  </div>
</template>
<!--<template slot="delete" slot-scope="props"-->
<!--&gt;-->
  <!--&lt;!&ndash; We use @click.stop here to prevent a 'row-clicked' event from also happening &ndash;&gt;-->
  <!--<a  class="fa fa-trash-o fa-2x"-->
      <!--v-for="sub in subs" v-bind:key="sub._id"-->
      <!--@click="deleteSubmission(sub._id)" >-->
  <!--</a>-->

<!--</template>-->

<script>
import SubmissionServices from '@/services/subservices'
import Vue from 'vue'
import VueTables from 'vue-tables-2'
import swal from 'sweetalert'

Vue.use(VueTables.ClientTable, {
  compileTemplates: true,
  filterByColumn: true,
  sortByColumn: true
})
export default {
  name: 'subs',
  data () {
    return {
      messagetitle: 'Registered Members',
      subs: [],
      props: ['_id'],
      errors: [],
      columns: [
        'fname',
        'age',
        'gender',
        'startWeight',
        'goalWeight',
        'currentWeight',
        'location',
        'edit',
        'remove'
      ],
      options: {
        filterable: ['name', 'age', 'location'],
        sortable: ['name', 'age'],
        headings: {
          fname: 'Name',
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
      SubmissionServices.getSubmissions()
        .then(reponse => {
          this.subs = reponse.data
          console.log(this.subs)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    ee: function (id) {
      this.$router.params = id
      this.$router.push('update-submission')
    },
    deleteSubmission: function (id) {
      swal({
        title: 'Are you totaly sure?',
        text: "You can't Undo this action",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete it',
        cancelButtonText: 'Cancel',
        showCloseButton: true,
        showLoaderOnConfirm: true,
        reverseButtons: true
      }).then(result => {
        console.log('SWAL RESULT: ' + result)
        if (result.value === false) {
          swal('Cancelled', 'Your Donation still Counts!', 'info')
        } else {
          SubmissionServices.deleteSubmission(id)
            .then(response => {
              this.name = response.data
              console.log(this.name)
              this.loadsubs()
              swal('Deleted!', 'Your file has been deleted.', 'success')
            })
            .catch(error => {
              swal(
                'ERROR',
                'Something went wrong trying to Delete ' + error,
                'error'
              )
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
  font-size: 15pt;
  margin-bottom: 10px;
}
#table {
  width: 85%;
  margin: 0 auto;
  font-size: 15pt;
}
</style>
