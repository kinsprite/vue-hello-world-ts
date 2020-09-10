<script lang="ts">
import { CreateElement, RenderContext, Component as VueComponent } from 'vue';
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

import LazyContent from '@/components/LazyContent.vue'; // @ is an alias to /src
import { RootState } from '@/store/types';

import { FETCH_LAZY } from './store';

@Component({
  components: {
    LazyContent,
  },
})
export default class LazyApp extends Vue {
  lazyComponent: VueComponent | null = null;

  state = {};

  // ssrHtml = '';
  ssrHtml = '<span>Some lazy app.</span>';

  render(createElement: CreateElement, context: RenderContext) {
    if (this.lazyComponent) {
      return createElement('div', {}, [
        createElement(this.lazyComponent, { props: { state: this.state } }),
      ]);
    }

    return createElement('div', {
      domProps: {
        innerHTML: this.ssrHtml,
      },
    });
  }

  mounted() {
    this.mountLazyApp();
  }

  async mountLazyApp() {
    // Load styles and scripts
    const info = await Promise.resolve({
      styles: [],
      scripts: [],
    });

    // find the lazy component
    const { component } = await Promise.resolve({
      component: {
        render: (h: CreateElement) => h('span', {}, ['Some lazy app.']),
      },
    });

    // mount the lazy micro fontends app
    const app = new Vue({
      router: this.$router,
      store: this.$store,
      render: (h) => h(component),
    });

    this.$nextTick(() => {
      app.$mount(this.$el.firstElementChild as Element);
    });
  }
}
</script>
