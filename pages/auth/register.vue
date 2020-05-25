<template>
  <!-- Section Cards -->
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-600 mb-4 text-center font-22">Register</h1>
      <form class="auth-form" @submit.prevent="submit">
        <alert-success :form="registerForm">
          Registration successful. Please, check your email to verify your
          account
        </alert-success>
        <div class="form-group">
          <base-input
            v-model.trim="registerForm.name"
            type="text"
            placeholder="Full Name (Firstname Lastname)"
            :form="registerForm"
            field="name"
          ></base-input>
        </div>

        <div class="form-group">
          <base-input
            v-model.trim="registerForm.username"
            type="text"
            placeholder="Username"
            :form="registerForm"
            field="username"
          ></base-input>
        </div>

        <div class="form-group">
          <base-input
            v-model.trim="registerForm.email"
            type="email"
            placeholder="Email"
            :form="registerForm"
            field="email"
          ></base-input>
        </div>

        <div class="form-group">
          <base-input
            v-model.trim="registerForm.password"
            type="password"
            placeholder="Password"
            :form="registerForm"
            field="password"
          ></base-input>
        </div>

        <div class="form-group">
          <input
            type="password"
            v-model.trim="registerForm.password_confirmation"
            name="password_confirmation"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Confirm Password"
          />
        </div>

        <div class="text-right">
          <base-button :block="true">
            Register
          </base-button>
        </div>
        <p class="font-14 fw-400 text-center mt-4">
          Already have an account?
          <nuxt-link :to="{ name: 'login' }" class="color-blue"
            >Login</nuxt-link
          >
        </p>
      </form>
    </div>
  </section>
  <!-- End Cards -->
</template>

<script>
export default {
  data() {
    return {
      registerForm: this.$vform({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      })
    }
  },

  methods: {
    submit() {
      this.registerForm
        .post('/register')
        .then((res) => {
          this.registerForm.reset()
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style></style>
