<template>
  <div class="setting-block">
    <div class="setting-title font-16 fw-600">Designs</div>
    <div class="setting-body white-bg-color">
      <table class="table table-striped">
        <thead>
          <tr>
            <td></td>
            <td>Title</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="design in designs" :key="design.id">
            <td>
              <div v-if="design.images">
                <img :src="design.images.thumbnail" width="100" />
              </div>
            </td>
            <td class="text-capitalize">{{ design.title }}</td>
            <td>{{ design.is_live ? 'Published' : 'Draft' }}</td>
            <td>
              <nuxt-link
                :to="{ name: 'designs.edit', params: { id: design.id } }"
              >
                Edit
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      designs: []
    }
  },

  methods: {
    async fetchUserDesigns() {
      const { data } = await this.$axios.$get(
        `/users/${this.$auth.user.id}/designs`
      )
      this.designs = data
    }
  },

  created() {
    this.fetchUserDesigns()
  }
}
</script>

<style>
</style>

 props: {
    design: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      current_user_likes: false,
      total_likes: 0
    }
  },

  methods: {
    likeDesign() {
      this.$axios.post(`/designs/${this.design.id}/likes`).then((res) => {
        this.current_user_likes = !this.current_user_likes
        this.total_likes = res.data.total
      })
    }
  },

  created() {
    this.total_likes = this.design.likes_count

    this.$axios.$get(`/designs/${this.design.id}/liked`).then((res) => {
      this.current_user_likes = res.liked
    })
  }