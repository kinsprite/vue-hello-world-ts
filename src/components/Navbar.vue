<template>
  <nav class="navbar">
    <ul>
      <li class="link" v-for="route in routes" :key="route.href">
        <router-link :to="route.href"
          :active-class="'active'"
          :exact="route.href === '/'"
          >{{ route.text }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export type Route = {
  href: string,
  text: string,
};

@Component
export default class Navbar extends Vue {
  @Prop() private routes!: Route[];
}
</script>

<style lang="scss" scoped>
@import '../sass/var';

.navbar {
  height: $nav-height;
  padding: $content-margin 0;

  li {
    display: inline-block;
  }
}

.link > a {
  margin: 0 0.12rem;
  padding: 0 0.04rem;
  color: $link-color;
  text-decoration: none;

  &.active {
    color: $active-color;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 0.02rem;
      bottom: -0.04rem;
      width: calc(100% - 0.04rem);
      border-bottom: $active-color 0.02rem solid;
    }
  }
}
</style>
