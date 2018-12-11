<template>
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
              <label class="form-control-label" name="goalWeight">Goal Weight</label>
              <input class="form__input" type="number" placeholder="goalWeight" v-model="goalWeight"/>
            </div>

            <div class="form-group">
              <label class="form-control-label" currentWeight="goalWeight">Current Weight</label>
              <input class="form__input" type="number" placeholder="currentWeight" v-model="currentWeight" />
            </div>

            <div class="form-group">
              <label class="form-control-label" name="height">Height</label>
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
              <label class="form-control-label" name="date">Date</label>
              <input class="form__input" type="date" placeholder="date" v-model="date" />
            </div>

            <p>
              <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{subbtnt}}</button>
            </p>
            <p>
              <a href="#/submissions" class="btn btn-primary btn1" id="bb" name="bb" role="button">View Member Info</a>
            </p>
            <p class="typo__p" v-if="submitStatus === 'OK'">New member updated</p>
            <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
            <p class="typo__p" v-if="submitStatus === 'PENDING'">Updating...</p>
          </form>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})
Vue.use(Vuelidate)

export default {
  name: 'FormData',
  props: ['subbtnt', 'sub'],
  data () {
    return {
      messagetitle: 'Add new Member',
      name: this.sub.name,
      age: this.sub.age,
      gender: this.sub.gender,
      startWeight: this.sub.startWeight,
      goalWeight: this.sub.goalWeight,
      currentWeight: this.sub.currentWeight,
      height: this.sub.height,
      location: this.sub.location,
      date: this.sub.date,
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
          // this.addnewsub(this.sub)
          this.$emit('submission-is-created-updated', this.sub)
        }, 500)
      }
    }
    // addnewsub: function (sub) {
    //   console.log('submission added!')
    //   console.log(' adding new submission ' + sub)
    //   SubmissionServices.addSubmissions(sub)
    //     .then((response) => {
    //       // JSON responses are automatically parsed.
    //       console.log(response)
    //     })
    //     .catch(error => {
    //       this.errors.push(error)
    //       console.log(error)
    //     })
    // }
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
    margin: 0 auto;
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
    width: 100%;
    font-size: large;
    background-color: teal;
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
