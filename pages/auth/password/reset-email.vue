<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-600 mb-4 text-center font-22">
        Reset password
      </h1>

      <form class="auth-form" @submit.prevent="submit">
        <alert-error :form="resetForm">
          {{ status }}
        </alert-error>

        <alert-success :form="resetForm">
          {{ status }}
        </alert-success>

        <div class="form-group">
          <base-input
            v-model.trim="resetForm.email"
            type="email"
            placeholder="Email"
            :form="resetForm"
            field="email"
          ></base-input>
        </div>

        <div class="text-right">
          <button
            type="submit"
            :disabled="resetForm.busy"
            class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase"
          >
            <span v-if="resetForm.busy">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            Send Reset Link
          </button>
        </div>

        <p class="font-14 fw-400 text-center mt-4">
          <nuxt-link :to="{ name: 'login' }" class="color-blue">
            Back to Login
          </nuxt-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  middleware: ['guest'],
  
  data() {
    return {
      status: '',
      resetForm: this.$vform({
        email: ''
      })
    }
  },

  methods: {
    submit() {
      this.resetForm
        .post('/password/email')
        .then((res) => {
          this.status = res.data.message
          this.resetForm.reset()
        })
        .catch((e) => {
          this.status = e.response.data.message
        })
    }
  }
}
</script>

<style>
</style>