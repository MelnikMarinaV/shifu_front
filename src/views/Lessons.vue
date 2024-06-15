<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { ref, onMounted } from 'vue';

const courses = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8001/api/courses/');
    console.log(response)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data.courses[0].title);
    courses.value = data.courses;
  } catch (error) {
    console.error('Error fetching items', error);
  }
});
</script>

<template>
    <body>
    <div class = "lessons-container">
      <div class="topnav">
        <img class="logo" src="../pictures/logo-no-background.png" alt="">
      </div>
      <h1>Курсы</h1>
    <ul>
      <li v-for="course in courses" :key="course.id">
        {{ course.title }} 
      </li>
    </ul>
    </div>
    </body>
  </template>
  
  <style>
  * {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
}
  .lessons-container{
    min-height: 100vh;
    margin: 0;
    background: #CD071E;
  }
  .topnav{
    padding: 5vh;
  }
  .logo{
    width: 10%;
  }
  </style>
  