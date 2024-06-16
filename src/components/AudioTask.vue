<script setup>
import { ref } from 'vue'

const props = defineProps({
  initial_text: {
    type: String,
    required: true
  },
  pinini: {
    type: String,
    required: true
  },
  task_id: {
    type: Number,
    required: true
  }
})

const show = ref(false)

function showPinini(){
  show.value = !show.value
}

async function playAudio() {
  try {
    const response = await fetch(`http://localhost:8001/get_audio/${props.task_id}`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    // Создаем аудио элемент 
    const audio = new Audio(audioUrl);
    audio.play(); 

  } catch (error) {
    console.error("Ошибка при воспроизведении аудио:", error);
  }
}


</script>

<template>
  <div class = "task">
    <button id="play_audio" @click="playAudio"><img src="../pictures/play-button.png" alt=""></button>
    <button id="show_pinini" @click="showPinini"><img src="../pictures/show-button.png" alt=""></button>
    <p id="initial_text">{{ initial_text }}</p>
    <button id="record_button" @click="toggleRecording"><img src="../pictures/record-button.png" alt=""></button>
    <br>
    <p v-show="show" id="pinini">{{ pinini }}</p>
  </div>
</template>

<style scoped>
.task{
  display: inline-block;
  text-align: center;
  margin-bottom: 40px;
}
#play_audio,#show_pinini,#record_button{
  background: none;
  border: none;
  width: 30px;
}
#play_audio:hover,#show_pinini:hover,#record_button:hover{
  opacity: 0.5;
}

#show_pinini{
  margin-right: 10px;
}

#initial_text{
  font-size: 40px;
  font-weight: bold;
}
button,p{
  display: inline-block;
}

#pinini{
    font-size: 20px;
    margin-top: 10px;
    color: #CD071E;
}

</style>