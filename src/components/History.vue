<script lang="ts">
import { ref, defineComponent } from 'vue';
import { Calculator } from './calculator';

export default defineComponent({
  components: { Calculator },
  setup() {
    const historyList = ref([]);
    function handleSubmit() {
      console.log(historyList);
    }
    return {
      handleSubmit,
      historyList,
    };
  },
});
</script>

<template>
  <div>
    <div class="container">
      <Calculator @submit.prevent="handleSubmit"  />
      <div class="display"></div>
    </div>
    <div class="footer">
      <button>AC</button>
      <button>DEL</button>
      <button>import</button>
      <button>export</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}
.display {
  height: 260px;
  width: 50%;
  font-size: 20px;
  text-align: right;
  padding: 20px;
  border-radius: 5px;
  color: #e0e1dd;
  background-color: rgba(13, 27, 42, 0.3);
  border: none;
  box-sizing: border-box;
  margin-top: 10px;
}
</style>
