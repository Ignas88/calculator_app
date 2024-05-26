<script setup lang="ts">
import { ref } from 'vue';
import HistoryDisplay from '@components/HistoryDisplay.vue';
import { FORM_ID } from '@commons/calculator';

const display = ref('');
function handleChange(value: string) {
  display.value = value;
}
</script>

<template>
  <div class="container">
    <div class="row">
      <button :form="FORM_ID" type="submit" class="primary">
        =
      </button>
      <div class="display"><span>{{ display }}</span></div>
    </div>
    <history-display @change="handleChange" />
  </div>
</template>

<style scoped>
.container {
  background-color: #264653;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin-left: 10px;
  margin-right: 10px;
}
.display {
  height: 56px;
  width: 100%;
  font-size: 20px;
  padding: 20px;
  border-radius: 5px;
  color: #e0e1dd;
  background-color: rgba(13, 27, 42, 0.3);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
button {
  width: calc(100% / 5);
  height: 60px;
  margin: 10px 5px;
  border-radius: 10px;
  background-color: #264653;
  color: #e0e1dd;
  font-size: 21px;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
button:hover {
  transform: translateY(-4px);
  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);
}
button:focus {
  outline: none;
}
button.primary {
  color: #2a9d8f;
}
button.error {
  color: #e76f51;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@media only screen and (max-width: 600px) {
  button {
    font-size: 18px;
  }
  .calculator {
    width: 50%;
  }
}
</style>
