<script setup lang="ts">
import { ref, watch } from 'vue';
import { Calculator, type Calculation } from './calculator';

const emit = defineEmits<{change: [value: string]}>();
const historyList = ref<Calculation[]>([]);
const counterRef = ref<InstanceType<typeof Calculator> | null>(null);

function handleChange(value: string) {
  emit('change', value);
}
function handleSubmit(calculations: Calculation[]) {
  if (calculations.length > 0) {
    historyList.value = calculations;
  }
}
function handleClear() {
  counterRef?.value?.clear();
}
watch(
  () => counterRef?.value?.display,
  (value) => handleChange(value || ''),
);
watch(
  () => counterRef?.value?.calculations,
  (calculations) => calculations?.length && handleSubmit(calculations),
);
</script>

<template>
  <div>
    <div class="container">
      <Calculator ref="counterRef" />
      <div class="display">
        <div
            v-for="{ operation, value } in historyList"
            :key="operation"
            class="display-entry"
        >
          <span>{{ operation }}</span><span v-if="value"> = {{ value }}</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <button @click.prevent="handleClear" class="error">AC</button>
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
  width: 160px;
  font-size: 20px;
  text-align: left;
  padding: 10px;
  border-radius: 5px;
  color: #e0e1dd;
  background-color: rgba(13, 27, 42, 0.3);
  box-sizing: border-box;
  margin-top: 10px;
  overflow-x: scroll;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}
.display-entry {
  font-size: 13px;
  opacity: 0.8;
}
</style>
