<template>
  <b-container fluid id="table">
    <!-- User Interface controls -->
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Search" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Sort" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null">-- none --</option>
              <option value="lname">-- Last Name --</option>
              <option value="fname">-- First Name --</option>
              <option value="age">-- Age --</option>
            </b-form-select>
            <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Sort direction" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortDirection" slot="append">
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
              <option value="last">Last</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Total" class="mb-0">
          <b-form-select :options="pageOptions" v-model="perPage" />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table show-empty
             stacked="md"
             :items="subs"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :sort-direction="sortDirection"
             @filtered="onFiltered"
    >
      <template slot="name" slot-scope="row">{{row.value.fname}}</template>
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" variant="info" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>

      <template slot="update" slot-scope="row" v-for="sub in subs"  >
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->

        <b-button
          v-bind:key="sub.id"
          size="sm"
          variant="info"
          @click="ee(sub._id)" >Update</b-button>
      </template>

        <template slot="delete" slot-scope="row" v-for="sub in subs">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->

           <b-button  v-bind:key="sub.id"
            size="sm"
                      variant="info"
            @click="deleteSubmission(sub._id)" >Delete</b-button>
        </template>
      <template slot="row-details" slot-scope="row">
        <b-card  header="Member information"
                 header-text-variant="white"
                 header-tag="header"
                 header-bg-variant="info"
                 footer="To update or end the membership"
                 footer-tag="footer"
                 footer-bg-variant="info"
                 footer-text-variant="white"
                 text-variant="dark"
                 style="max-width: 80rem"
        >
          <ul >
            <li  v-for="(value, key) in row.item" :key="key">
              {{key}}: {{value}}
            </li>
          </ul>

          <!--<div  v-for="(value, key) in row.item" :key="key">-->
            <!--<p>-->
              <!--{{key}} ~ {{value}}-->
            <!--</p>-->
          <!--</div>-->
        </b-card>

      </template>
    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows"
                      :per-page="perPage"
                      v-model="currentPage"
                      class="my-0" />
      </b-col>
    </b-row>

  </b-container>

</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
import SubmissionServices from '../services/subservices'
import bTable from 'bootstrap-vue/es/components/table/table'
import VueModalTor from 'vue-modaltor'
import swal from 'sweetalert'
Vue.use(VueModalTor)
Vue.use(VueResource)
Vue.component('b-table', bTable)
export default {
  name: 'subs',
  data () {
    return {
      subs: [],
      props: ['_id'],
      errors: [],
      fields: [
        { key: 'fname', label: 'First Name', sortable: true, 'class': 'text-center' },
        { key: 'lname', label: 'Last Name', sortable: true, 'class': 'text-center' },
        { key: 'location', label: 'Location', sortable: true, 'class': 'text-center' },
        { key: 'age', label: 'Age', sortable: true, 'class': 'text-center' },
        { key: 'actions', label: 'Show all Member Info' },
        { key: 'update', label: 'Update info' },
        { key: 'delete', label: 'Delete Member' }
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 10, 15 ],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      totalRows: this.subs,
      open: false
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.subs
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
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

    info (sub, index, button) {
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(sub, null, 5)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },

    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },

    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    ee: function (id) {
      console.log(id)
      this.$router.params = id
      console.log('edit page')
      this.$router.push('update-submission')
    },
    deleteSubmission: function (id) {
      console.log(id)
      swal({
        title: 'Are you sure?',
        text: 'Your will not be able to recover to recover this members account!',
        icon: 'warning',
        dangerMode: true,
        buttons: {
          cancel: true,
          confirm: 'Confirm'
        }
      }).then(result => {
        console.log('SWAL RESULT: ' + result)
        if (result === true) {
          SubmissionServices.deleteSubmission(id)
            .then(response => {
              this.lname = response.data
              console.log(this.lname)
              this.loadsubs()
              swal('Deleted!', 'Members information has been deleted.', 'success')
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
        } else {
          swal('Cancelled', 'Member file is safe :)', 'error')
        }
      })
    },
    hideModal () {
      this.open = false
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
    width: 60%;
    margin: 0 auto;
    font-size: 10pt;
    text-align: left;
  }
  #card{
    font-size: 8pt;
    width: 500px;
    background-color: #FCE1E5;
    text-emphasis-color: #111111;
    align-content: center;
  }
</style>
