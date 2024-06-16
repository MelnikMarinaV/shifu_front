import { createRouter, createWebHistory } from 'vue-router';
import Lessons from '../views/Lessons.vue';

const routes = [
  {
    path: '/lessons',  //URL-путь для страницы со списком уроков
    name: 'lessons', 
    component: Lessons //компонент, который будет отображаться по этому маршруту.
  },
  { 
    path: '/lesson/:id', //URL-путь для динамических страниц уроков
    component: () => import('../views/Lesson.vue') 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes 
});

export default router;