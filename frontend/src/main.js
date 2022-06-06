// Import Vue and Router
import * as Vue from 'vue';
import * as VueRouter from 'vue-router';

// Import fetch function globally
import fetchMixin from '@/mixins/fetchMixin';

// Import Font Awesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faCheckToSlot, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import Pages:
import App from './App.vue';
// Home Page
import Index from './views/HomePage.vue';
// Create Question page
import CreateQuestion from './views/CreateQuestion.vue';
// Singular Question page
import DisplayQuestion from './views/DisplayQuestion.vue';
// Question List page
import ListQuestions from './views/QuestionList.vue';

// Add icons
library.add(faPlus, faCheckToSlot, faSquarePollVertical);

const routes = [
  {
    name: 'CreateQuestion',
    path: '/qa',
    component: CreateQuestion,
  },
  {
    name: 'Index',
    path: '/',
    component: Index,
  },
  {
    name: 'ListQuestions',
    path: '/questions',
    component: ListQuestions,
  },
  {
    name: 'DisplayQuestion',
    path: '/qa/:id',
    component: DisplayQuestion,
  },
];

// Init router
const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

// Create Vue app
Vue.createApp(App)
  .use(router)
  .mixin(fetchMixin)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
