<template>
  <Books v-bind:msg="booksMsg" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Books from '@/components/Books.vue'; // @ is an alias to /src

import { AsyncDataParam } from './aysncParam';

@Component({
  components: {
    Books,
  },
})
export default class BooksPage extends Vue {
  booksMsg: string;

  constructor() {
    super();
    this.booksMsg = 'books message';
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  asyncData({ store, route }: AsyncDataParam): Promise<any> {
    return store.dispatch('fetchItem', route.params.id);
  }
}
</script>
