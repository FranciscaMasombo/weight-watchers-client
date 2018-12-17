<!--suppress JSValidateTypes -->
<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <div class="row">
        <div class="col">
          <b-form-group
            :class="{ 'form-group--error': $v.fname.$error }"
            class="form-control-label"
            label="First Name"
          >
            <b-form-input
              class="form__input"
              type="text"
              v-model="fname"
              required
              placeholder="Enter First Name"
            >
            </b-form-input>
          </b-form-group>
          <div class="error" v-if="submitStatus === 'OK'">required</div>
        </div>
        <div class="col">
          <b-form-group
            id="lname"
            class="form-control-label"
            label="Last Name"
            label-for="lname"
          >
            <b-form-input
              id="fname"
              type="text"
              v-model="lname"
              required
              placeholder="Enter Last Name"
            >
            </b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b-form-group
            id="email"
            class="form-control-label"
            label="Email address:"
            label-for="email"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="email"
              type="email"
              v-model="email"
              required
              placeholder="Enter email"
            >
            </b-form-input>
          </b-form-group>
        </div>
        <div class="col">
          <b-form-group
            id="number"
            class="form-control-label"
            label="Your Contact Number:"
            label-for="number"
          >
            <b-form-input
              id="number"
              type="tel"
              v-model="number"
              required
              placeholder="Enter Phone Number"
            >
            </b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b-form-group
            id="age"
            class="form-control-label"
            label="Your Age:"
            label-for="age"
          >
            <b-form-input
              id="age"
              type="number"
              v-model="age"
              required
              placeholder="Enter Your Age"
            >
            </b-form-input>
          </b-form-group>
        </div>
        <div class="col">
          <b-form-group label="Gender" class="form-control-label">
            <b-form-radio-group id="gender" v-model="gender" name="gender">
              <b-form-radio value="Female">Female</b-form-radio>
              <b-form-radio value="Male">Male</b-form-radio>
              <b-form-radio value="Other">Other</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b-form-group
            id="weightType"
            class="form-control-label"
            label="Weight Type"
            label-for="weightType"
          >
            <b-form-select :value="null" id="weightType">
              <option slot="first" :value="null">Choose...</option>
              <option value="Pounds">Pounds</option>
              <option value="Stone">Stone</option>
              <option value="Kg">Kg</option>
            </b-form-select>
          </b-form-group>
        </div>
        <div class="col">
          <b-form-group
            id="startWeight"
            class="form-control-label"
            label="Start Weight"
            label-for="startWeight"
          >
            <b-form-input
              id="startWeight"
              type="number"
              min="0"
              max="600"
              v-model="startWeight"
              required
            >
            </b-form-input>
          </b-form-group>
        </div>
        <div class="col">
          <b-form-group
            id="goalWeight"
            class="form-control-label"
            label="Goal Weight"
            label-for="goalWeight"
          >
            <b-form-input
              id="goalWeight"
              type="number"
              min="0"
              max="600"
              v-model="goalWeight"
              required
            >
            </b-form-input>
          </b-form-group>
        </div>
        <div class="col">
          <b-form-group
            id="currentWeight"
            class="form-control-label"
            label="Current Weight"
            label-for="currentWeight"
          >
            <b-form-input
              id="currentWeight"
              type="number"
              min="0"
              max="600"
              v-model="currentWeight"
              required
            >
            </b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b-form-group
            id="location"
            class="form-control-label"
            label="Location"
            label-for="location"
          >
            <b-form-select :value="null" id="location">
              <option slot="first" :value="null">Choose...</option>
              <option value="Dublin">Dublin</option>
              <option value="Waterford">Waterford</option>
              <option value="Cork">Cork</option>
            </b-form-select>
          </b-form-group>
        </div>
        <div class="col">
          <b-form-group
            id="date"
            class="form-control-label"
            label="Date of Membership:"
            label-for="date"
          >
            <b-form-input
              id="date"
              type="date"
              v-model="date"
              required
              placeholder="Enter Your Age"
            >
            </b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b-form-group
            id="note"
            class="form-control-label"
            label="Note"
            label-for="note"
          >
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              v-model="note"
              placeholder="Enter something"
              rows="3"
            ></textarea>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <b-button
            class="btn btn-primary btn1"
            type="submit"
            variant="primary"
            :disabled="submitStatus === 'PENDING'"
            >{{ subbtnt }}
          </b-button>
          <b-button type="reset" variant="danger">Reset </b-button>
          <a
            href="#/submissions"
            class="btn btn-primary btn1"
            id="bb"
            name="bb"
            role="button"
            >View Member Info</a
          >
        </div>
      </div>

      <p class="typo__p" v-if="submitStatus === 'OK'">New member updated</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">
        Please Fill in the Form Correctly.
      </p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Updating...</p>
    </b-form>
  </div>
</template>
<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import bForm from 'bootstrap-vue/es/components/form/form'
import { required } from 'vuelidate/lib/validators'
Vue.component('b-form', bForm)
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
      fname: this.sub.fname,
      lname: this.sub.lname,
      email: this.sub.email,
      number: this.sub.number,
      gender: this.sub.gender,
      age: this.sub.age,
      weightType: this.sub.weightType,
      startWeight: this.sub.startWeight,
      goalWeight: this.sub.goalWeight,
      currentWeight: this.sub.currentWeight,
      location: this.sub.location,
      date: this.sub.date,
      note: this.sub.note,
      submitStatus: null
    }
  },
  validations: {
    fname: {
      required
    }
  },
  methods: {
    onSubmit: function (evt) {
      evt.preventDefault()
      console.log('added')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        this.submitStatus = 'OK'
        console.log('whats going on')
        let sub = {
          fname: this.fname,
          lname: this.lname,
          email: this.email,
          number: this.number,
          gender: this.gender,
          age: this.age,
          weightType: this.weightType,
          startWeight: this.startWeight,
          goalWeight: this.goalWeight,
          currentWeight: this.currentWeight,
          location: this.location,
          date: this.date,
          note: this.note
        }
        this.sub = sub
        console.log(
          'Add the new Submission: ' + JSON.stringify(this.sub, null, 5)
        )
        // this.$emit('value', this.sub)
        this.$emit('RegisterNewMember', this.sub)
      }
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.lname = ''
      this.fname = ''
      this.email = ''
      this.number = ''
      this.gender = ''
      this.age = ''
      this.weightType = ''
      this.startWeight = ''
      this.goalWeight = ''
      this.currentWeight = ''
      this.location = ''
      this.date = ''
      this.note = ''
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<!-- b-form-1.vue -->
<style scoped>
.form-control-label {
  text-align: left;
}
label {
  display: inline-block;
  width: 480px;
  text-align: left;
  font-size: large;
}
</style>
