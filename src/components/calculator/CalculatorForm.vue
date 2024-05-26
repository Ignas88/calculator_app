<script setup lang="ts">
import { ref } from 'vue';
import {
  numbers, operators, FORM_ID, mathTestRegExp,
} from './constants';
import { type Calculation } from './types';

const display = ref('');
const calculations = ref<Calculation[]>([]);

function update(value: string) {
  display.value += value;
}
function clear() {
  display.value = '';
}
function clearLastChar() {
  display.value = display.value.slice(0, -1);
}
function handleSubmit() {
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
  display.value = value;
}
defineExpose({ clear, display, calculations });
</script>

<template>
  <form :id="FORM_ID" class="calculator" @submit.prevent="handleSubmit">
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
  justify-content: center;
}
.operators{
  display: flex;
  flex-direction: column;
}

@media only screen and (max-width: 426px) {
  button {
    font-size: 18px !important;
  }
  .calculator {
    max-width: 260px !important;
  }
}
</style>
