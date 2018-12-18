<template>
  <div id="app1" class="hero">
    <h3 class="vue-title">{{ messagetitle }}</h3>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <submission-form
            :sub="sub"
            subbtnt="Add"
            @RegisterNewMember="RegisterNewMember"
          >

          </submission-form>
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
import SubmissionForm from '@/components/newSubForm'
export default {
  data () {
    return {
      sub: {
        fname: '',
        lname: '',
        email: '',
        number: '',
        gender: '',
        age: '',
        weightType: '',
        startWeight: '',
        goalWeight: '',
        currentWeight: '',
        location: '',
        date: '',
        note: ''
      },
      messagetitle: 'Bellow is where you can Register a new member '
    }
  },
  components: {
    'submission-form': SubmissionForm
  },
  methods: {
    RegisterNewMember: function (sub) {
      console.log('submission added!')
      console.log(' adding new submission ' + sub)
      SubmissionServices.addSubmissions(sub)
        .then(response => {
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
  width: 88%;
  margin: 0 auto;
}
.vue-title {
  margin-top: 30px;
  text-align: center;
  font-size: 45pt;
  margin-bottom: 10px;
}
</style>
