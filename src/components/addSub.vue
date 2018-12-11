<template>
  <div id="app1" class="hero">
    <h3 class="vue-title">{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <submission-form :sub="sub" subbtnt="Add"
                           @submission-is-created-updated="addnewsub"></submission-form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>
<script>

import SubmissionServices from '@/services/subservices'
import SubmissionForm from '@/components/subForm'
export default {
  data () {
    return {
      sub: {
        name: '',
        age: '',
        gender: '',
        startWeight: '',
        goalWeight: '',
        currentWeight: '',
        height: '',
        location: '',
        date: ''
      },
      messagetitle: ' Add '
    }
  },
  components: {
    'submission-form': SubmissionForm
  },
  methods: {
    addnewsub: function (sub) {
      console.log('submission added!')
      console.log(' adding new submission ' + sub)
      SubmissionServices.addSubmissions(sub)
        .then((response) => {
          // JSON responses are automatically parsed.
          console.log(response)
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
