import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps-withscopedautocomp'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAddwFzEu83xzv_3kQjwLOrK3d35bmiOKg',
    libraries: 'places'
  }
})
