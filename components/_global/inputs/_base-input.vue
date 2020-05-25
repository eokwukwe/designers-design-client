<template>
  <div>
    <input
      class="form-control form-control-lg font-14 fw-300"
      :type="type"
      :value="value"
      :readonly="readonly"
      :placeholder="placeholder"
      :class="{ 'is-invalid': form.errors.has(field) }"
      @input="handleInput"
    />
    <has-error :form="form" :field="field"></has-error>
  </div>
</template>

<script>
export default {
  name: 'base-input',

  props: {
    form: {
      type: Object,
      required: true
    },
    field: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    }
  },
  mounted() {
    // console.log(this.$attrs)
  }
}
</script>

<style>
</style>