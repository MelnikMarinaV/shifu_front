<script setup>
import { ref } from 'vue' // // Импорт функции "ref" для создания реактивных переменных

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

//Реактивные переменные
const show = ref(false); //управление видимости пининь для каждого упражнения

let mediaRecorder = null;
let mediaStream = null;
const chunks = ref([]);
const recording = ref(false);

function showPinini(){
  show.value = !show.value
}

//функция для воспроизведения произношения диктора
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

const toggleRecording = async () => {
  if (recording.value) {
    mediaRecorder.stop();
    mediaStream.getTracks().forEach(track => track.stop());
    recording.value = false;
  } else {
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorder.ondataavailable = e => {
        console.log(e.data);
        chunks.value.push(e.data);
      };
      mediaRecorder.onstop = async () => {
        // Запись остановлена
        const blob = new Blob(chunks.value, { type: 'audio/mpeg' });
        console.log(chunks.value);
        const formData = new FormData();
        formData.append('audio', blob, 'recording.mpeg');

        try {
          const response = await fetch(`http://localhost:8001/upload_audio/${props.task_id}`, {
            method: 'POST',
            body: formData
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          console.log('Audio uploaded successfully', data);
        } catch (error) {
          console.error('Error uploading audio', error);
        }
        chunks.value = [];
      };
      mediaRecorder.start();
      recording.value = true;
    } catch (err) {
      console.error('Error accessing microphone', err);
    }
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