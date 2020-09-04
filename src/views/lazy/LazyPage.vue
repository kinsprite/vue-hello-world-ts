<template>
  <div>
    <LazyContent :value="num" />
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LazyContent from '@/components/LazyContent.vue'; // @ is an alias to /src

import { RootState } from '@/store/types';
import { AsyncDataParam } from '../aysncParam';
import { FETCH_LAZY } from './store';

@Component({
  components: {
    LazyContent,
  },
})
export default class LazyPage extends Vue {
  num: number;

  constructor() {
    super();
    this.num = 100;
  }

  getStore(): RootState {
    return this.$store as unknown as RootState;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  asyncData({ store, route }: AsyncDataParam): Promise<any> {
    return store.dispatch(FETCH_LAZY);
  }
}
</script>
