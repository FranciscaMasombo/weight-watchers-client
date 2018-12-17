<template>
  <div id="app1" class="hero">
    <h3 class="vue-title">{{ messagetitle }}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <template v-if="childDataLoaded">
            <submission-form
              :sub="sub"
              subbtnt="Update"
              @submission-is-created-updated="updateSubmission"
            ></submission-form>
          </template>
        </div>
        <!-- /col -->
      </div>
      <!-- /row -->
    </div>
    <!-- /container -->
  </div>
</template>

<script>
import SubmissionServices from '@/services/subservices'
import SubmissionForm from '@/components/subForm'

export default {
  data () {
    return {
      sub: {},
      childDataLoaded: false,
      temp: {},
      messagetitle: ' Update Member Information '
    }
  },
  components: {
    'submission-form': SubmissionForm
  },
  created () {
    this.getsubmission()
  },
  methods: {
    getsubmission: function () {
      SubmissionServices.findOneSubmission(this.$router.params)
        .then(response => {
          this.temp = response.data
          this.sub = this.temp[0]
          this.childDataLoaded = true
          console.log(
            'getting the member info' + JSON.stringify(this.sub, null, 5)
          )
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    updateSubmission: function (sub) {
      console.log('Before PUT ' + JSON.stringify(sub, null, 5))
      SubmissionServices.putSubmission(this.$router.params, sub)
        .then(response => {
          console.log(response)
          console.log('AFTER PUT ' + JSON.stringify(sub, null, 5))
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
#app1 {
  width: 95%;
  margin: 0 auto;
}
.vue-title {
  margin-top: 30px;
  text-align: center;
  font-size: 45pt;
  margin-bottom: 10px;
}
</style>
