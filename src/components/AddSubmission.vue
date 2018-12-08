<template>
  <div id="app1" class="add">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="add">

            <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
              <label class="form-control-label" name="name">Name</label>
              <input class="form__input" type="text" v-model="name" />
            </div>
            <div class="error" v-if="submitStatus === 'OK'"> required </div>

            <div class="form-group">
              <label class="form-control-label" name="age">Age</label>
              <input class="form__input" type="number" v-model.number="age" />
            </div>

            <div class="form-group">
              <label class="form-control-label">Select Gender</label>
              <select id="gender" name="gender " class="form-control" type="text" v-model="gender">
                <option value="null" selected disabled hidden>Select Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-control-label" name="startWeight">Start Weight</label>
              <input class="form__input" type="text" placeholder="Start Weight" v-model="startWeight" />
            </div>

            <div class="form-group">
              <label class="form-control-label" name="goalWeight">goalWeight</label>
              <input class="form__input" type="number" placeholder="goalWeight" v-model="goalWeight"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" currentWeight="goalWeight">currentWeight</label>
              <input class="form__input" type="number" placeholder="currentWeight" v-model="currentWeight" />
            </div>

            <div class="form-group">
              <label class="form-control-label" name="height">height</label>
              <input class="form__input" type="number" placeholder="height" v-model="height" />
            </div>

            <div class="form-group">
              <label class="form-label">Select location</label>
              <select id="location" name="location " class="form-control" type="text" v-model="location">
                <option value="null" selected disabled hidden> Choose Your location </option>
                <option value="Waterford">Waterford</option>
                <option value="Cork">Cork</option>
                <option value="Dublin">Dublin</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-control-label" name="date">date</label>
              <input class="form__input" type="date" placeholder="date" v-model="date" />
            </div>

            <p>
              <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Make Donation</button>
            </p>
            <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your Donation!</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Donating...</p>
          </form>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import VueSweetalert from 'vue-sweetalert'
import SubmissionServices from '@/services/SubmissionServices'
import { required } from 'vuelidate/lib/validators'
Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})
Vue.use(Vuelidate)
Vue.use(VueSweetalert)
export default {
  name: 'AddSubmission',
  data () {
    return {
      messagetitle: 'Add new Submission',
      name: '',
      age: '',
      gender: '',
      startWeight: '',
      goalWeight: '',
      currentWeight: '',
      height: '',
      location: '',
      date: '',
      sub: {},
      submitStatus: null
    }
  },
  validations: {
    name: {
      required
    }
  },
  methods: {
    add () {
      console.log('added')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          console.log('whats going on')
          var sub = {
            name: this.name,
            age: this.age,
            gender: this.gender,
            startWeight: this.startWeight,
            goalWeight: this.goalWeight,
            currentWeight: this.currentWeight,
            height: this.height,
            location: this.location,
            date: this.date
          }
          this.sub = sub
          console.log('Add the new Submission: ' + JSON.stringify(this.sub, null, 5))
          this.addnewsub(this.sub)
        }, 500)
      }
    },
    addnewsub: function (sub) {
      console.log('submission added!')
      console.log(' adding new submission ' + sub)
      SubmissionServices.addsub(sub)
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
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
  #app1 {
    width: 99%;

  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
.form-control-label{
  text-align: left;
}
  label {
    display: inline-block;
    width: 480px;
    text-align: left;
    font-size: large;
  }
  .typo__p {
    width: 480px;
    font-size: large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
