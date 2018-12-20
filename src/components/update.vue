<template>
  <div id="app1" class="hero">
    <h3 class="vue-title">{{ messagetitle }}</h3>
          <template v-if="childDataLoaded">
            <submissionform
              :sub="sub"
              subbtnt="Update"
              @RegisterNewMemberUpdateNewMember="updateSubmission"
            ></submissionform>
          </template>
  </div>
</template>

<script>
import SubmissionServices from '@/services/subservices'
import SubmissionForm from '../components/newSubForm'

export default {
  name: 'update',
  data () {
    return {
      sub: {},
      temp: {},
      childDataLoaded: false,
      messagetitle: ' Update Member Information '
    }
  },
  components: {
    'submissionform': SubmissionForm
  },
  created () {
    this.getSubmission()
  },
  methods: {
    getSubmission: function () {
      SubmissionServices.findOneSubmission(this.$router.params)
        .then(response => {
          this.temp = response.data
          console.log('Getting Donation in Edit: ' + JSON.stringify(this.temp, null, 5))

          this.sub = this.temp[0]
          this.childDataLoaded = true
          console.log('Getting Donation in Edit: ' + JSON.stringify(this.sub, null, 5))
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
  width: 50%;
  margin: 0 auto;
}
.vue-title {
  margin-top: 30px;
  text-align: center;
  font-size: 45pt;
  margin-bottom: 10px;
}
</style>
