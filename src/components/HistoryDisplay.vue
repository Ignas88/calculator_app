<script setup lang="ts">
import { ref, watch } from 'vue';
import { Calculator, type Calculation } from './calculator';

const emit = defineEmits<{change: [value: string]}>();
const historyList = ref<Calculation[]>([]);
const counterRef = ref<InstanceType<typeof Calculator> | null>(null);

function handleClear() {
  counterRef?.value?.clear();
}
function handleClearLastEntry() {
  counterRef?.value?.clearLastEntry();
}
watch(
  () => counterRef?.value?.display,
  (value) => emit('change', value || ''),
);
watch(
  () => counterRef?.value?.calculations,
  (calculations) => {
    if (calculations?.length) historyList.value = calculations;
  },
);
</script>

<template>
  <div>
    <div class="container">
      <Calculator ref="counterRef" />
      <div>
        <button @click.prevent="handleClearLastEntry" class="error small">{{ "&lt;--" }}</button>
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
  height: 260px;
  width: 160px;
  font-size: 20px;
  text-align: left;
  padding: 10px;
  border-radius: 5px;
  color: #e0e1dd;
  background-color: rgba(13, 27, 42, 0.3);
  box-sizing: border-box;
  overflow-x: scroll;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}
.small {
  width: 100%;
  margin: 10px 0 10px 0;
  font-size: 15px;
  height: 30px;
}
.display-entry {
  font-size: 13px;
  opacity: 0.8;
}
</style>
