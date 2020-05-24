<template>
  <!-- Section Cards -->
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Login
      </h1>
      <form class="auth-form" @submit.prevent="submit">
        <alert-error v-if="loginForm.errors.has('message')" :form="loginForm">
          {{ loginForm.errors.get('message') }}<span>.</span>
          <p>
            Check your email for the verification link or click the link below
            to receive a new one
          </p>
          <nuxt-link :to="{ name: 'verification.resend' }"
            >Resend verification</nuxt-link
          >
        </alert-error>

        <div class="form-group">
          <input
            type="text"
            v-model.trim="loginForm.email"
            name="email"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': loginForm.errors.has('email') }"
            placeholder="Email"
          />
          <has-error :form="loginForm" field="email"></has-error>
        </div>

        <div class="form-group">
          <input
            type="password"
            v-model.trim="loginForm.password"
            name="password"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': loginForm.errors.has('password') }"
            placeholder="Password"
          />
          <has-error :form="loginForm" field="password"></has-error>
        </div>

        <div class="mt-4 mb-4 clearfix">
          <a class="forgot-pass color-blue font-14 fw-400" href="#">
            Forgot password?
          </a>
        </div>

        <div class="text-right">
          <button
            type="submit"
            :disabled="loginForm.busy"
            class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase"
          >
            <span v-if="loginForm.busy">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            Login
          </button>
        </div>
        <p class="font-14 fw-400 text-center mt-4">
          Don't have an account yet?
          <nuxt-link :to="{ name: 'register' }" class="color-blue">
            Create an account</nuxt-link
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
      loginForm: this.$vform({
        email: '',
        password: ''
      })
    }
  },

  methods: {
    submit() {
      // using nuxt/auth module
      this.$auth
        .loginWith('local', {
          data: this.loginForm
        })
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          // Bescause we're using the auth module, we need to set the error
          // on the form manually
          this.loginForm.errors.set(error.response.data.errors)
        })
    }
  }
}
</script>

<style></style>
