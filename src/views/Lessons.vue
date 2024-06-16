<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue';


const courses = ref([]);
const lessons = ref([]);

onMounted(async () => {
  try {
    const courseResponse = await fetch('http://localhost:8001/api/courses/');
    if (!courseResponse.ok) {
      throw new Error('Network courseResponse was not ok');
    }
    const courseData = await courseResponse.json();
    courses.value = courseData.courses;

    if(courses.value.length>0){
        const courseId = courses.value[0].id;
        const lessonsResponse = await fetch(`http://localhost:8001/api/lessons/${courseId}`);
        
        if (!lessonsResponse.ok) {
        throw new Error('Network response was not ok for lessons');
        }
        const lessonsData = await lessonsResponse.json();
        lessons.value = lessonsData.lessons; 
    }
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
      <h1 v-for="course in courses" :key="course.id">
        {{ course.title }} 
      </h1>
      <div class ="lessons">
        <ol v-if="lessons.length">
            <li v-for="lesson in lessons">
            <RouterLink :to="`/lesson/${lesson.id}`" class="router-link">{{ lesson.title }}</RouterLink>
            </li>
        </ol>
      </div>
    </div>
    </body>
  </template>
  
  <style scoped>
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
    text-align: center;
}
.topnav{
    padding: 5vh;
    text-align: left;
  }
.logo{
    width: 10%;
}

h1{
    margin-bottom: 20px;
    font-size: 3rem;
    font-weight: 700;
    letter-spacing: .5rem;
    font-family: 'Times New Roman', Times, serif;
    background: rgb(221,229,142);
    background: linear-gradient(0deg, rgba(221,229,142,1) 0%, rgba(224,229,177,1) 21%, rgba(182,181,48,0.8716620437237395) 100%);
    background-clip: text;
    color: transparent;
}

.lessons{
  margin: auto;
  width: 70%;
  height: 80%;
}

ol {
  counter-reset: section;
  list-style-type:"HSK1 - ";
  list-style-position: inside;
  width: 100%;      
  margin: 0 auto; 
  color: #CD071E;
  text-align: center;
  font-size: 20px;
}

li::before{
  counter-increment: section;
  content: counters(section,".") " ";
  color: #CD071E;
}

li{
  background: rgb(209,131,117);
  background: radial-gradient(circle, rgba(209,131,117,0.8744631641719187) 0%, rgba(235,237,210,0.7232026599702381) 50%); 
  width: 100%;
  border: 1px solid #CD071E;
  border-radius: 25px;
  margin-bottom: 5px;
  padding: 10px 0 0 0;
}

li:hover{
  background-color: gold;
}

.router-link{
  display: block;
  text-decoration: none;
  color: #CD071E;
  padding: 20px;
  font-size: 30px;
}
  </style>
  