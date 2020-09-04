<template>
 <div class="container">
    This is async content. value is {{ value }}.
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LazyContent extends Vue {
  @Prop() private value!: number;
}
</script>

<style lang="scss" scoped>
.container {
  background: #f223f2;
}
</style>
