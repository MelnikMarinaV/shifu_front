<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const items = ref([]);
const description = ref(''); 
const title = ref('');

onMounted(async () => {
        try {
          const response = await fetch(`http://localhost:8001/api/tasks/${route.params.id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();

          description.value = data.description;
          title.value = data.title;
          items.value = data.tasks;
        } catch (error) {
          console.error('Error fetching items', error);
        }
});

</script>


<template>
    <div class="lesson-wrapper">
    <div class="heading">
      <h1>{{ title }}</h1>
    </div>
      <div v-html="description"></div>
      <div class="tasks">
        <p>Постарайтесь прочитать иероглифы самостоятельно. Затем откройте пининь и перевод. Запишите выражения своим голосом.</p>
      </div>
    </div>
    </template>


<style scoped>

.lesson-wrapper{
  min-height: 100vh;
  background: radial-gradient(circle, rgba(228,228,206,0.7344071417629552) 30%, rgba(229,220,137,0.6167600829394257) 64%, rgba(227, 226, 177, 0.695) 98%); 
}

h1{
  text-align: center;
  padding: 20px;
}





</style>