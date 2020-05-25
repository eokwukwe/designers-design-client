<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Email Verification
      </h1>
      <form class="auth-form">
        <div class="form-group" v-if="success">
          <div class="alert alert-success">
            {{ status }}
          </div>
          <nuxt-link :to="{ name: 'login' }">Proceed to Login</nuxt-link>
        </div>

        <div class="form-group" v-else>
          <div class="alert alert-danger">
            {{ status }}
          </div>
          <nuxt-link :to="{ name: 'verification.resend' }"
            >Resend verification link</nuxt-link
          >
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  middleware: ['guest'],
  
  async asyncData({ params, query, app }) {
    // build a query string
    const q = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join('&')

    try {
      const { data } = await app.$axios.post(
        `/verification/verify/${params.id}?${q}`
      )
      return { success: true, status: data.message }
    } catch (error) {
      console.log(error.response.data)

      return { success: false, status: error.response.data.error.message }
    }
  }
}
</script>

<style>
</style>