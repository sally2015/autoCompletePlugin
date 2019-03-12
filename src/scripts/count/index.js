
import Vue from 'vue';
import iview from 'iview';
import App from './contentscript.vue';
const el = document.createElement('div');
const link = document.createElement('link');
link.href = 'https://unpkg.com/iview@3.3.0/dist/styles/iview.css';
link.rel = 'stylesheet';
link.type = 'text/css';

document.head.appendChild(link);
document.body.appendChild(el);
Vue.use(iview);
const app = new Vue({
  render(createElement) {
    return createElement(App);
  }
});
app.$mount(el);
