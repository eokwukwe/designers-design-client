<template>
  <div>
    <section class="hero text-center bg-secondary text-white">
      <div class="container">
        <h1 class="font-28 fw-600 text-uppercase">
          Upload a design
        </h1>
      </div>
    </section>

    <!-- Upload Shot -->
    <div class="upload-shot">
      <div class="container">
        <div class="row justify-content-center align-items-center text-center">
          <div class="col-md-6">
            <div class="card bg-white shadow-sm">
              <div class="d-flex flex-column justify-content-center p-1">
                <div class="alert alert-danger" v-if="error">
                  <p>An error occurred during the upload process</p>
                  <p class="font-weight-bold">{{ error }}</p>
                </div>

                <client-only>
                  <slim-cropper :options="slimOptions">
                    <input type="file" name="image" />
                  </slim-cropper>
                </client-only>

                <div class="text-success caption-sm mt-2" v-if="uploading">
                  <i class="fas fa-spinner fa-spin"></i>
                </div>
              </div>
            </div>

            <div class="card bg-white shadow-sm upload-para p-2">
              <p class="font-14 fw-400">
                Dimensions: <strong>800 × 600</strong> pixels minimum. Size:
                <strong>2MB</strong> maximun. Formats:
                <strong>JPG, GIF or PNG.</strong>
              </p>
              <p class="font-12 fw-300">
                Please, resize before upload
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Upload Shot -->
  </div>
</template>

<script>
import Slim from '@/components/slim/slim'

export default {
  middleware: ['auth'],

  components: {
    'slim-cropper': Slim
  },

  data() {
    return {
      slimOptions: {
        service: this.slimService,
        post: 'output',
        defaultInputName: 'image',
        minSize: '800,600',
        label: 'Upload image',
        maxFileSize: 2 // 2MB,
      },
      uploading: false,
      error: ''
    }
  },

  methods: {
    slimService(formdata, progress, success, failure, slim) {
      this.uploading = true
      this.$axios
        .post('/designs', formdata)
        .then((res) => {
          this.$router.push({
            name: 'designs.edit',
            params: { id: res.data.id }
          })
        })
        .catch((e) => {
          const message = e.response.data.errors
          this.error = message[Object.keys(message)[0]][0]
          failure(500)
        })
        .finally(() => {
          this.uploading = false
        })
    }
  }
}
</script>

<style>
</style>