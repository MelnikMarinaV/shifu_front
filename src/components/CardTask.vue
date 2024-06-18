<script>
import draggable from 'vuedraggable'

export default {
  components: {
      draggable,
  },
  mounted() {
    this.fetchData();
  },
  data() {
    return {
      initial_text: [],
      translated_items: [],
      initial_order: [],
      final_order:[],
      isCorrect: false,
      showResult: false 
      }
  },
    methods: {
      checkCorrection() {
        this.final_order = this.translated_items.map(tasks => tasks.id);
        // Сравниваем массивы объектов напрямую
        const isCorrect = JSON.stringify(this.final_order) === JSON.stringify(this.initial_order);
        // Выводим результат
        this.isCorrect = isCorrect; // Обновляем состояние
        this.showResult = true; // Показываем результат
      },
      async fetchData() {
        try {
          const response = await fetch(`http://localhost:8001/api/tasks/2`);
          const data = await response.json();
          this.initial_text = data.tasks;
          this.translated_items=data.tasks;
          this.initial_order = this.initial_text.map(tasks => tasks.id);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
          }
      },
    }
}
</script>

<template>
    <div class="task">
      <div class="content"> 
        <div class="initial-text">
          <ul v-if="initial_text.length">
            <li v-for="item in initial_text" :key="item.id">
              <p class="initial-item">{{ item.title }}</p>
            </li>
          </ul>
        </div>
        <div class="translated-text">
          <draggable v-model="translated_items" item-key="id">
            <template #item="{ element }">
              <li class="translated-item">{{ element.description }}</li>
            </template>
          </draggable>
        </div>
      </div>
      <button id="check_button" @click="checkCorrection">Проверить</button> 
    </div>
    <div v-if="showResult">
        <p id="correct_answer" v-if="isCorrect">Отличная работа, всё верно!</p>
        <p id="wrong_answer" v-else>Неправильно, попробуйте еще раз.</p>
  </div>
  </template>
  
  <style scoped>
  .task {
    display: flex;
    flex-direction: column;
    align-items: center;   
  }
  
  .content {
    display: flex;           
    gap: 20px;              
  }

  li{
    list-style-type: none;
  }

  .initial-item{
    color:#CD071E;
    font-size: 40px;
  }

  .translated-item{
    font-size: 30px;
    text-align: left;
    margin-bottom: 1rem;
  }

  #check_button{
    width: 300px;
    height: 40px;
    text-align: center;
    border-radius: 3.125rem;
    background: rgb(221,229,142);
    background: linear-gradient(0deg, rgba(221,229,142,1) 0%, rgba(224,229,177,1) 21%, rgba(182, 182, 48, 0.467) 100%);
    font-family: 'Times New Roman', Times, serif;
    font-size: 1.5rem;
    font-weight: 900;
    color: rgba(113, 101, 22, 0.401);
    border: solid 1px;
    border-color:rgba(224,229,177,1);
    margin: 25px 0 50px 0;
  }

  #check_button:hover{
    background-color:rgba(209,131,117,0.8744631641719187);
  }
  #check_button:active{
    background-color:rgba(209,131,117,0.8744631641719187);
  }

  #correct_answer{
    color: rgb(21, 201, 69);
    font-size: 30px;
  }

  #wrong_answer{
    color: #CD071E;
    font-size: 30px;
  }

  </style>