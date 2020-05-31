<template>
  <div>
    <section class="post-details mt-4 pb-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-9">
            <div class="row">
              <!-- LEFT -->
              <div class="col-md-8">
                <!-- Single Image -->
                <div class="post-detail">
                  <div class="single-img">
                    <img :src="design.images.large" alt="Image" />
                  </div>
                </div>
                <!-- End Single Image -->
                <!-- Design Detail Text -->
                <div class="desing-text font-16 fw-400 pb-3 pt-2">
                  <p>
                    {{
                      `${design.description[0].toUpperCase()}${design.description.slice(
                        1
                      )}`
                    }}
                  </p>
                </div>
                <!-- End Design Detail Text -->

                <!-- Design Comments -->
                <div class="design-comments mt-3">
                  <h1 class="font-16 fw-300 mb-4">
                    <strong class="fw-500"
                      >{{ comments.length }} comments</strong
                    >
                  </h1>
                  <ul class="comment-list">
                    <DesignComment
                      v-for="comment in comments"
                      :key="comment.id"
                      :comment="comment"
                      @deleted="handleDelete"
                    ></DesignComment>
                  </ul>
                </div>

                <!-- Comment form -->
                <template v-if="$auth.loggedIn">
                  <div v-if="error" class="alert alert-error">
                    {{ errorMsg }}
                  </div>
                  <form @submit.prevent="saveComment">
                    <!-- <div class="form-group">
                      <div v-if="error" class="alert alert-error">
                        {{ errorMsg }}
                      </div>
                    </div> -->

                    <base-textarea
                      :rows="2"
                      :form="commentForm"
                      field="body"
                      v-model.trim="commentForm.body"
                      placeholder="Enter a comment"
                    ></base-textarea>

                    <div class="mt-2 text-right">
                      <base-button :loading="commentForm.busy" size="sm">
                        Post comment
                      </base-button>
                    </div>
                  </form>
                </template>

                <!--/ END COMMENTS-->
              </div>

              <!-- RIGHT -->
              <div class="col-md-4">
                <div class="post-detail-sidebar">
                  <!-- Designer info -->
                  <div class="modal-user-meta white-bg-color">
                    <a class="float-left" href="#" title="Neba">
                      <img :src="design.user.photo_url" alt="User image" />
                    </a>
                    <div class="modal-user-detail">
                      <h1
                        class="font-13 fw-500 font-weight-bold text-capitalize"
                      >
                        <a href="#">
                          {{ design.user.name }}
                        </a>
                      </h1>
                      <p class="font-12 fw-300 mt-2 text-capitalize">
                        <span class="shot-by">{{ design.user.tagline }}</span>
                      </p>
                      <p class="font-12 fw-300  mt-1">
                        {{ design.created_dates.created_at_human }}
                      </p>
                    </div>
                  </div>
                  <!-- End Designer info -->

                  <!-- Designer Design Info -->
                  <ul class="details-side-meta font-14 fw-400">
                    <DesignLike :design="design"></DesignLike>

                    <li class="d-table w-100">
                      <div class="stats-txt d-table-cell w-100 text-capitalize">
                        <a href="#"> More from {{ design.user.name }} </a>
                      </div>
                    </li>
                  </ul>
                  <!-- End Designer Design Info -->

                  <!-- Designer More Designs -->
                  <div class="more-designs-outer pb-3">
                    <ul class="more-designs row">
                      <li
                        class="col-md-6"
                        v-for="designerDesign in designerDesigns"
                        :key="designerDesign.id"
                      >
                        <nuxt-link
                          :to="{
                            name: 'designs.show',
                            params: { slug: designerDesign.slug }
                          }"
                          href="#"
                        >
                          <img
                            class="w-100"
                            :src="designerDesign.images.thumbnail"
                            alt="Design"
                          />
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                  <!-- End Designer More Designs -->

                  <!-- Designs Tags -->
                  <div class="designs-tag-outer mt-3">
                    <h2 class="font-16 fw-500 mb-2">
                      Tags
                    </h2>
                    <div
                      class="designs-tag font-14 fw-300"
                      v-if="design.tag_list"
                    >
                      <a
                        class="badge badge-info my-md-1"
                        v-for="(tag, i) in design.tag_list.tags"
                        :key="`tag-${i}`"
                        :href="`/tags/${design.tag_list.normalized}`"
                      >
                        {{ tag }}
                      </a>
                    </div>
                  </div>
                  <!-- End Designs Tags -->
                </div>
              </div>
              <!--/ END RIGHT-->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import DesignComment from '@/components/DesignComment'
import DesignLike from '@/components/DesignLike'

export default {
  components: {
    DesignComment,
    DesignLike
  },

  data() {
    return {
      error: false,
      errorMsg: '',
      commentForm: this.$vform({
        body: ''
      })
    }
  },

  async asyncData({ $axios, params }) {
    try {
      const response = await $axios.$get(`/designs/slug/${params.slug}`)
      const designerId = response.data.user.id
      const designerOtherDesigns = await $axios.$get(
        `/users/${designerId}/designs`
      )
      return {
        design: response.data,
        comments: response.data.comments,
        designerDesigns: designerOtherDesigns.data.filter(
          (d) => d.id !== response.data.id
        )
      }
    } catch (e) {
      if (e.response.status === 404) {
        error({ statusCode: 404, message: 'Design not found' })
      } else if (e.response.status === 401) {
        redirect('/login')
      } else {
        error({ statusCode: 500, message: 'Internal server error' })
      }
    }
  },

  methods: {
    handleDelete(id) {
      this.comments = this.comments.filter((c) => c.id !== id)
    },

    saveComment() {
      this.commentForm
        .post(`/designs/${this.design.id}/comments`)
        .then((res) => {
          this.commentForm.reset()
          this.comments = [...this.comments, res.data.data]
        })
        .catch((e) => {
          if (e.response.status !== 422) {
            this.error = true
            this.errorMsg = 'Could not send your comment. Please try again'
          }
        })
    }
  }
}
</script>

<style>
</style>