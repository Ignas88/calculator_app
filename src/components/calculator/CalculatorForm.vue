<script setup lang="ts">
import { ref, watch } from 'vue';
import Papa from 'papaparse';
import {
  numbers, operators, FORM_ID, CSV_TYPE,
} from './constants';
import { type Calculation } from './types';
import {
  download, isWithOperator, isValidMathExpression,
} from './utils';

const display = ref('');
const calculations = ref<Calculation[]>([]);
const inputRef = ref<InstanceType<typeof HTMLInputElement> | null>(null);

function update(value: string) {
  display.value += value;
}
function clear() {
  display.value = '';
}
function clearLastEntry() {
  const lastIndex = calculations.value.length - 1;
  calculations.value = calculations.value.filter((_entry, index) => index !== lastIndex);
}
function clearLastChar() {
  display.value = display.value.slice(0, -1);
}
function submit() {
  const operation = display.value;
  if (!isWithOperator(operation)) {
    return;
  }
  if (!isValidMathExpression(operation)) return;
  // eslint-disable-next-line no-eval
  const value = `${eval(operation)}`;
  calculations.value = [...calculations.value, { operation, value }];
}
function exportCalculations() {
  download(calculations.value);
}
function importCalculations() {
  // eslint-disable-next-line no-alert
  alert('import csv. Columns: [operation][value]');
  inputRef?.value?.click();
}
async function handleChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!target.files) return;
  const file = target.files[0];
  if (file.type !== CSV_TYPE) {
    // eslint-disable-next-line no-alert
    alert('wrong file type - choose .csv file');
    return;
  }
  Papa.parse<Calculation>(file, {
    header: true,
    skipEmptyLines: true,
    step: (results) => {
      if (results.errors.length) {
        console.error('Errors while parsing:', results.errors);
      }
      const row = results.data;
      if ('operation' in row) {
        const { operation } = row;
        if (!isWithOperator(operation)) {
          return;
        }
        if (!isValidMathExpression(operation)) return;
        // eslint-disable-next-line no-eval
        const value = row.value ?? `${eval(operation)}`;
        calculations.value = [...calculations.value, { operation, value }];
      }
    },
  });
}
watch(
  () => calculations.value[calculations.value.length - 1],
  (lastEntry: Calculation) => {
    display.value = lastEntry?.value ?? '';
  },
);
defineExpose({
  submit, clear, clearLastEntry, exportCalculations, importCalculations, display, calculations,
});
</script>

<template>
  <form :id="FORM_ID" class="calculator" @submit.prevent="submit">
    <div class="numbers">
      <button
          v-for="{ value } in numbers"
          :key="value"
          @click.prevent="update(value)"
      >
        {{ value }}
      </button>
      <button @click.prevent="clearLastChar" class="error">DEL</button>
    </div>
    <div class="operators">
      <button
          v-for="value in operators"
          :key="value"
          @click.prevent="update(value)"
          class="primary"
      >
        {{ value }}
      </button>
    </div>
    <input @change="handleChange" style="display: none" ref="inputRef" type="file">
  </form>
</template>

<style scoped>
.calculator {
  display: flex;
  height: 320px;
}
.numbers {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  width: 184px;
  justify-content: flex-start;
}
.operators{
  display: flex;
  flex-direction: column;
}

@media only screen and (max-width: 600px) {
  .calculator {
    flex-direction: column;
    height: auto;
  }
  .operators {
    flex-direction: row;
    width: 200%;
    justify-content: space-between;
    margin-top: -10px;
  }
}
</style>
