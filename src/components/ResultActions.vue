<script lang="ts">
import { ref } from 'vue';
import History from './History.vue';

export default {
  components: { History },
  setup() {
    const display = ref('');
    const calculate = (value: string) => {
      display.value = value;
    };
    return {
      calculate,
      display,
      FORM_ID,
    };
  },
};
</script>

<template>
  <div class="container">
    <History :form-id="FORM_ID" @submit.prevent="calculate" />
    <div class="footer">
      <button :form="FORM_ID" type="submit">
        calculate
      </button>
      <div class="display">{{ display }}</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 360px;
  background-color: #264653;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.footer {
  display: flex;
}
.display {
  width: 100%;
  height: 56px;
  font-size: 20px;
  text-align: right;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 5px;
  color: #e0e1dd;
  background-color: rgba(13, 27, 42, 0.3);
  border: none;
  box-sizing: border-box;
}
</style>

<style>
body {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #bf4d5d;
}
</style>
