import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import { __esModule } from 'vform'

// require all components in the current directory and subdirectories
const requireComponent = require.context('.', true, /_base-[\w-]+\.vue$/)

requireComponent.keys().forEach((fileName) => {
  // get the component's configuration
  const componentConfig = requireComponent(fileName)

  // get component filename without the extentions
  // e.g. ./buttons/_base-button.vue ==> _base-button
  const fn = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')

  // Remove the underscore and dash from the filename and
  //  convert to Pascal case
  // e.g. _base-button ==> BaseButton
  const componentName = upperFirst(camelCase(fn))

  // register the component
  Vue.component(componentName, componentConfig.default || componentConfig)
})
