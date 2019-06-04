/*
 * @Author: Guo Xiang Jie 
 * @Date: 2019-03-20 14:28:20 
 * @Last Modified by: Guo Xiang Jie
 * @Last Modified time: 2019-04-02 08:49:53
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import './assets/normalize.css'
import './theme/index.less'
import 'animate.css'
import Print from './assets/print'
import 'core-js/fn/promise';


router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});
// 加上这段话
router.afterEach(route => {
  iView.LoadingBar.finish();
});
Vue.use(iView);
Vue.use(Print)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
