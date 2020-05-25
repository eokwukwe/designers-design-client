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
          <input
            type="text"
            v-model.trim="registerForm.name"
            name="name"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': registerForm.errors.has('name') }"
            placeholder="Full Name (Firstname Lastname)"
          />
          <has-error :form="registerForm" field="name"></has-error>
        </div>

        <div class="form-group">
          <input
            type="text"
            v-model.trim="registerForm.username"
            name="username"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': registerForm.errors.has('username') }"
            placeholder="Username"
          />
          <has-error :form="registerForm" field="username"></has-error>
        </div>

        <div class="form-group">
          <input
            type="text"
            v-model.trim="registerForm.email"
            name="email"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': registerForm.errors.has('email') }"
            placeholder="Email"
          />
          <has-error :form="registerForm" field="email"></has-error>
        </div>

        <div class="form-group">
          <input
            type="password"
            v-model.trim="registerForm.password"
            name="password"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': registerForm.errors.has('password') }"
            placeholder="Password"
          />
          <has-error :form="registerForm" field="password"></has-error>
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
