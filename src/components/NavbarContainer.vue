<template>
  <Navbar :routes="routes">
  </Navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navbar, { Route } from './Navbar.vue';
import { routes } from './navbar.config';

@Component({
  components: {
    Navbar,
  },
})
export default class NavbarContainer extends Vue {
  private routes: Route[] = [];

  constructor() {
    super();
    this.routes = routes;
  }
}
</script>
