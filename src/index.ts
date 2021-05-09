// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Vue from 'vue';
import 'Vue/config';
import 'Vue/filters';
import store from './vue/store';

/**
 * SCSS
 */
import 'swiper/swiper-bundle.css';
import './styles/main.scss';

/**
 * TS
 */
import './helpers';
import './vue/components/entry';
import './helpers/lazyload';

/**
 * Auto find and import all .ts file in Shopify folder
 */
const tsFiles = require.context('Shopify/', true, /\.ts$/);
tsFiles.keys().forEach(tsFiles);

/**
 * vue components
 * auto-import all vue components
 */
const vueComponents = require.context('./vue/components/', true, /\.vue$/);
vueComponents.keys().forEach((key) => {
  const component = vueComponents(key).default;
  Vue.component(component.name, component);
});

/**
 * All SECTION is vue instance ( template vue )
 *
 * Properly render vue components inside sections on user insert in the theme editor
 * add the 'vue' keyword to the section's wrapper classes e.g.:
 *
 * {% schema %}
 * {
 *   "class": "shopify-section-vue"
 * }
 * {% endschema %}
 */

/* If merchant in designMode */
Shopify.designMode && document.addEventListener('shopify:section:load', (event) => {
  if (event.target.classList.value.includes('vue')) {
    const newInstanceVue = new Vue({
      el: event.target,
      store,
    });
  }
});

// /* If merchant in normalMode ( is Section ) */
// document.querySelectorAll('.shopify-section').forEach((section) => {
//   if (section.classList.value.includes('vue')) {
//     const newInstanceVue = new Vue({
//       el: section,
//       vuexStore,
//     });
//   }
// });

// /** If vue instace != section */
// document.querySelectorAll('[data-vue-instance]').forEach((section) => {
//   const newInstanceVue = new Vue({
//     el: section,
//     vuexStore,
//   });
// });

console.log('kmacoders developing..');
