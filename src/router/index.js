import { createRouter, createWebHistory } from 'vue-router';
import Lessons from '../views/Lessons.vue';

const routes = [
  {
    path: '/lessons', 
    name: 'lessons', 
    component: Lessons 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes 
});

export default router;