
import Vue from 'vue';
import iview from 'iview';
import App from './contentscript.vue';
import 'iview/dist/styles/iview.css';
const el = document.createElement('div');
document.body.appendChild(el);
Vue.use(iview);
const app = new Vue({
  render(createElement) {
    return createElement(App);
  }
});
app.$mount(el);
