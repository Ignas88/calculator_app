<script setup lang="ts">
import { ref, watch } from 'vue';
import { Calculator, type Calculation } from './calculator';

const emit = defineEmits<{change: [value: string]}>();
const historyList = ref<Calculation[]>([]);
const calculatorRef = ref<InstanceType<typeof Calculator> | null>(null);

function handleClear() {
  calculatorRef?.value?.clear();
}
function handleClearLastEntry() {
  calculatorRef?.value?.clearLastEntry();
}
function handleExport() {
  calculatorRef?.value?.exportCalculations();
}
function handleImport() {
  calculatorRef?.value?.importCalculations();
}
watch(
  () => calculatorRef?.value?.display,
  (value) => emit('change', value || ''),
);
watch(
  () => calculatorRef?.value?.calculations,
  (calculations) => {
    if (Array.isArray(calculations)) {
      historyList.value = calculations;
    }
  },
);
</script>

<template>
  <div>
    <div class="container">
      <calculator ref="calculatorRef" />
      <div class="display-container">
        <div class="row">
          <button @click.prevent="handleClear" class="error small">AC</button>
          <button @click.prevent="handleClearLastEntry" class="error small">{{ "&lt;--" }}</button>
        </div>
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
    <div class="row">
      <button class="small" @click.prevent="handleImport">
        import <span style="font-size: 9px; display: contents">.csv</span>
      </button>
      <button class="small" @click.prevent="handleExport">
        export <span style="font-size: 9px; display: contents">.csv</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.aib {
  align-items: baseline;
}
.container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}
.display-container {
  margin-top: 10px;
}
.display {
  height: 240px;
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
  margin-top: 10px;
}
.small {
  width: 100%;
  font-size: 15px;
  height: 30px;
}
.display-entry {
  font-size: 13px;
  opacity: 0.8;
}
@media only screen and (max-width: 600px) {
  .display-container {
    width: 100%;
    margin-top: 0;
    margin-left: 16px;
  }
  .display {
    width: 100%;
  }
}
</style>
