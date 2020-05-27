<template>
  <div class="setting-block">
    <div class="setting-title font-16 fw-500">Profile</div>

    <div class="setting-body white-bg-color">
      <form class="custom-form" @submit.prevent="update">
        <div class="row">
          <div class="col-md-6">
            <alert-success :form="updateProfileForm">
              {{ updated }}
            </alert-success>

            <alert-error :form="updateProfileForm">
              {{ updated }}
            </alert-error>

            <div class="form-group">
              <base-input
                :form="updateProfileForm"
                field="name"
                v-model.trim="updateProfileForm.name"
                placeholder="Full Name (Firstname Lastname)"
              ></base-input>
            </div>

            <div class="form-group">
              <base-input
                :form="updateProfileForm"
                field="tagline"
                v-model.trim="updateProfileForm.tagline"
                placeholder="Tagline"
              ></base-input>
            </div>

            <div class="form-group">
              <base-gmap
                :initialValue="updateProfileForm.formatted_address"
                @address-response="handleAddress"
              ></base-gmap>
            </div>

            <div class="form-group">
              <base-textarea
                :form="updateProfileForm"
                field="about"
                v-model.trim="updateProfileForm.about"
                placeholder="Tell us a little about yourself"
              ></base-textarea>
            </div>

            <div class="form-group custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="available_to_hire"
                v-model="updateProfileForm.available_to_hire"
              />
              <label
                class="custom-control-label"
                value="true"
                for="available_to_hire"
              >
                Available to Hire
              </label>
            </div>

            <div class="">
              <base-button :loading="updateProfileForm.busy">
                Update Profile
              </base-button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updated: '',
      updateProfileForm: this.$vform({
        name: '',
        about: '',
        tagline: '',
        available_to_hire: false,
        formatted_address: '',
        location: {}
      })
    }
  },

  methods: {
    update() {
      this.updateProfileForm
        .put(`/settings/profile`)
        .then((res) => {
          this.updated = 'Profile updated successfully'
          setTimeout(() => {
            this.$router.push({ name: 'settings.dashboard' })
          }, 1000)
        })
        .catch((e) => {
          console.error(e)
          this.updated = e.response.data.message
        })
    },
    handleAddress(data) {
      this.updateProfileForm.formatted_address = data.formatted_address
      this.updateProfileForm.location = {
        latitude: data.latitude,
        longitude: data.longitude
      }
    }
  },

  mounted() {
    Object.keys(this.updateProfileForm).forEach((k) => {
      if (this.$auth.user.hasOwnProperty(k)) {
        this.updateProfileForm[k] = this.$auth.user[k]
      }
    })

    if (this.$auth.user.location) {
      this.updateProfileForm.location = {
        longitude: this.$auth.user.location.coordinates[0],
        latitude: this.$auth.user.location.coordinates[1]
      }
    } else {
      this.updateProfileForm.location = {}
    }
  }
}
</script>

<style>
</style>