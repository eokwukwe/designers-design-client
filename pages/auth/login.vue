<template>
  <!-- Section Cards -->
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-600 mb-4 text-center font-22">
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
          <base-input
            v-model.trim="loginForm.email"
            type="email"
            placeholder="Email"
            :form="loginForm"
            field="email"
          ></base-input>
        </div>

        <div class="form-group">
          <base-input
            v-model.trim="loginForm.password"
            type="password"
            placeholder="Password"
            :form="loginForm"
            field="password"
          ></base-input>
        </div>

        <div class="mt-4 mb-4 clearfix">
          <nuxt-link
            :to="{ name: 'password.email' }"
            class="forgot-pass color-blue font-14 fw-400"
            href="#"
          >
            Forgot password?
          </nuxt-link>
        </div>

        <div class="text-right">
          <base-button :block="true" :loading="loading">
            Login
          </base-button>
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
  middleware: ['guest'],

  data() {
    return {
      loading: false,
      loginForm: this.$vform({
        email: '',
        password: ''
      })
    }
  },

  methods: {
    submit() {
      this.loading = true
      // using nuxt/auth module
      this.$auth
        .loginWith('local', {
          data: this.loginForm
        })
        .then((res) => {
          this.loginForm.reset();
          // console.log(res)
        })
        .catch((error) => {
          // Bescause we're using the auth module, we need to set the error
          // on the form manually
          this.loginForm.errors.set(error.response.data.errors)
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style></style>
