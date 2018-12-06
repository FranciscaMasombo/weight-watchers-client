<template>
  <div class="app">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
  </div>
</template>

<script>
import SubmissionServices from '@/services/SubmissionServices'
export default {
  name: 'Submissions',
  data () {
    return {
      messagetitle: 'submissions',
      submissions: [],
      errors: []
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
</style>
