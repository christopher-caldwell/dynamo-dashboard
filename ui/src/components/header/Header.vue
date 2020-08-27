<template lang="pug">
div
  v-navigation-drawer(v-model='isDrawerOpen', app, clipped)
    v-list.internal-drawer-container.listing-listy.list(dense)
      NavMenuItem(v-for='(route, index) in routes', :key='index', :route='route')
    #dark-mode-toggle
      v-switch(
        v-model='isDarkMode',
        @change='saveDarkModeSetting',
        label='Dark Mode',
        hide-details
      )
  v-app-bar(app, dense, clipped-left)
    v-app-bar-nav-icon(@click.stop='isDrawerOpen = !isDrawerOpen')
    v-toolbar-title.full-width
      v-row(justify='space-between', align='baseline')
        v-col
        v-col(cols='3', align-self='center') 
          //- v-img(height='60px', :src='require("@/assets/images/all-white.png")', contain)
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import NavMenuItem from '@/components/header/NavItem.vue'
import routes, { Route } from '../../router/routes'

interface Data {
  isDrawerOpen: boolean
  isDarkMode: boolean
  routes: Route[]
}

export default Vue.extend({
  components: {
    NavMenuItem,
  },
  data(): Data {
    return {
      isDrawerOpen: false,
      isDarkMode: true,
      routes,
    }
  },
  computed: {
    ...mapGetters('session', ['isInDarkMode']),
    isMobile() {
      return window.innerWidth < 1264
    },
  },
  mounted() {
    this.$vuetify.theme.dark = true
  },
  methods: {
    saveDarkModeSetting() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
})
</script>

<style lang="sass">
#dark-mode-toggle
  height: 40px
  width: 130px
  position: absolute
  bottom: 15%
  right: 4%
  @media screen and (min-width: 786px)
    bottom: 5%
    right: 4%
  .internal-drawer-container
    height: 100%
  #menu-badge
    left: -1px !important
    top: 1px !important
</style>
