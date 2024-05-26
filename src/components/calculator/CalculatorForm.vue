<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  numbers, operators, FORM_ID, mathTestRegExp,
} from './constants';
import { type Calculation } from './types';
import { download } from './utils';

const display = ref('');
const calculations = ref<Calculation[]>([]);

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
  const isWithOperator = operators.some((operator) => operation.includes(operator));
  if (!isWithOperator) {
    return;
  }
  const isValidMathExpression = mathTestRegExp.test(operation);
  if (!isValidMathExpression) return;
  // eslint-disable-next-line no-eval
  const value = `${eval(operation)}`;
  calculations.value = [...calculations.value, { operation, value }];
}
function exportCalculations() {
  download(calculations.value);
}
function importCalculations() {

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
  <div>
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
    </form>
    <div>

    </div>
  </div>
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
