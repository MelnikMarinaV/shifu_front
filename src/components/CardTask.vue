<script>
import { defineProps, ref, onMounted } from 'vue';
import draggable from 'vuedraggable'; // Импорт draggable 

export default {
  components: {
    draggable, // Регистрация draggable как локального компонента
  },
  data() {
    return {
      items: ['Элемент 1', 'Элемент 2', 'Элемент 3'],
    };
  },
  props: {
    initial_text: {
      type: String,
      required: true,
    },
    pinini: {
      type: String,
      required: true,
    },
    task_id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const pininiData = ref([]);

    onMounted(() => {
      pininiData.value = [{ id: props.task_id, value: props.pinini }]; 
    });

    return {
      pininiData,
    };
  },
  
};
</script>

<template> 
  <div class="tasks">
    <p class="initial-item">{{ initial_text }}</p>
  </div>
    <div class="draggable-container">
      <draggable v-model="pininiData">
     <template v-slot:item="{ element }"> 
       <div class="word-card">
         {{ element.value }} 
       </div>
     </template>
   </draggable>
    </div>
</template>

<style scoped>
.tasks{
  display: flex;
  /* text-align: left; */
  margin-left: 25%;
}
.initial-item{
  color:#CD071E;
  font-size: 40px;
}

.draggable-container{
  text-align: right;
  background-color: #CD071E;
}
  </style>


