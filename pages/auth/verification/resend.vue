<template>
  <!-- Section Cards -->
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-600 mb-4 text-center font-22">
        Resend Verification Email
      </h1>
      <form class="auth-form" @submit.prevent="submit">
        <alert-error v-if="resendForm.errors.has('message')" :form="resendForm">
          {{ resendForm.errors.get('message') }}
        </alert-error>

        <alert-success :form="resendForm">
          Email verification link has been sent to your email
        </alert-success>

        <div class="form-group">
          <base-input
            v-model.trim="resendForm.email"
            type="email"
            placeholder="Email"
            :form="resendForm"
            field="email"
          ></base-input>
        </div>

        <div class="text-right">
          <button
            type="submit"
            :disabled="resendForm.busy"
            class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase"
          >
            <span v-if="resendForm.busy">
              <i class="fas fa-spinner fa-spin"></i>
            </span>
            Resend
          </button>
        </div>
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
      resendForm: this.$vform({
        email: ''
      })
    }
  },

  methods: {
    submit() {
      this.resendForm
        .post('/verification/resend')
        .then((res) => {
          this.resendForm.reset()
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
</style>