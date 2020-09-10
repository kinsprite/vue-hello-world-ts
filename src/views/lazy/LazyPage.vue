<template>
  <div>
    <LazyContent :value="num" />
    <div>
      <router-link to="/lazy/sub">Lazy Sub</router-link>
    </div>
    <router-view/>
    <LazyApp />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

import LazyContent from '@/components/LazyContent.vue'; // @ is an alias to /src
import { RootState } from '@/store/types';

import LazyApp from './LazyApp.vue';
import { AsyncDataParam } from '../aysncParam';
import { FETCH_LAZY } from './store';

@Component({
  components: {
    LazyContent,
    LazyApp,
  },
  computed: mapState({
    num(state) { return (state as RootState).lazy.value; },
  }),
})
export default class LazyPage extends Vue {
  getStore(): RootState {
    return this.$store as unknown as RootState;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  asyncData({ store, route }: AsyncDataParam): Promise<any> {
    return store.dispatch(FETCH_LAZY);
  }

  beforeMount() {
    console.log('this.$store.dispatch(\'lazy/FETCH_LAZY\');');
    this.$store.dispatch(`lazy/${FETCH_LAZY}`);
  }
}
</script>
