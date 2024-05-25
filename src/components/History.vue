<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { Calculator, operators } from './calculator';

const emit = defineEmits<{change: [value: string]}>();
const historyList = ref<string[]>([]);
const counterRef = ref<InstanceType<typeof Calculator> | null>(null);
function handleChange(value: string) {
  emit('change', value);
}
function handleSubmit(operation: string, value?: string) {
  const withResult = `${operation}${value ? ` = ${value}` : ''}`;
  historyList.value.push(withResult);
  handleChange(value || operation);
}
function handleClear() {
  counterRef?.value?.clear();
}
function handleDelete() {
  counterRef?.value?.deleteLast();
}
</script>

<template>
  <div>
    <div class="container">
      <Calculator ref="counterRef" @submit="handleSubmit" @change="handleChange"  />
      <div class="display">
        <div v-for="entry in historyList" :key="entry" class="display-entry">
          {{ entry }}
        </div>
      </div>
    </div>
    <div class="footer">
      <button @click.prevent="handleClear" class="error">AC</button>
      <button @click.prevent="handleDelete" class="error">DEL</button>
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
  height: 320px;
  width: 100%;
  font-size: 20px;
  text-align: left;
  padding: 10px;
  border-radius: 5px;
  color: #e0e1dd;
  background-color: rgba(13, 27, 42, 0.3);
  box-sizing: border-box;
  margin-top: 10px;
  overflow-x: scroll;
  max-width: 200px;
}
.display-entry {
  font-size: 13px;
  opacity: 0.8;
}
</style>
