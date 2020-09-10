<template>
  <div class="books">
    <p>Books content.</p>
    <code>{{ msg }}</code>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Books extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.books {
  height: 10rem;
  background-color: #ddd;
}
</style>
