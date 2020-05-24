<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Reset Password
      </h1>
      <form class="auth-form" @submit.prevent="submit">
        <alert-success :form="passwordResetForm">
          {{ status }}
          <p>
            <nuxt-link :to="{name: 'login'}">Proceed to Login</nuxt-link>
          </p>
        </alert-success>

        <alert-error :form="passwordResetForm">
          {{ status }}
        </alert-error>

        <div class="form-group">
          <input
            type="email"
            v-model.trim="passwordResetForm.email"
            name="email"
            readonly
            :class="{ 'is-invalid': passwordResetForm.errors.has('email') }"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Email"
          />
          <has-error :form="passwordResetForm" field="email"></has-error>
        </div>

        <div class="form-group">
          <input
            type="password"
            v-model.trim="passwordResetForm.password"
            name="password"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': passwordResetForm.errors.has('password') }"
            placeholder="Password"
          />
          <has-error :form="passwordResetForm" field="password"></has-error>
        </div>

        <div class="form-group">
          <input
            type="password"
            v-model.trim="passwordResetForm.password_confirmation"
            name="password_confirmation"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Confirm New Password"
          />
        </div>

        <div class="text-right">
          <button
            type="submit"
            :disabled="passwordResetForm.busy"
            class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase"
          >
            <span v-if="passwordResetForm.busy">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            Reset Password
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      status: '',
      passwordResetForm: this.$vform({
        email: '',
        password: '',
        password_confirmation: '',
        token: ''
      })
    }
  },

  methods: {
    submit() {
      this.passwordResetForm
        .post('/password/reset')
        .then((res) => {
          this.status = res.data.message
          this.passwordResetForm.reset()
        })
        .catch((error) => {
          this.status = error.response.data.message
        })
    }
  },

  created() {
    this.passwordResetForm.email = this.$route.query.email
    this.passwordResetForm.token = this.$route.params.token
  }
}
</script>

<style>
</style>