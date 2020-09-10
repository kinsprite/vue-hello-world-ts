<template>
  <div id="app">
    <NavbarContainer />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavbarContainer from './components/NavbarContainer.vue';

@Component({
  components: {
    NavbarContainer,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
</style>
