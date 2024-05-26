<script setup lang="ts">
import { ref } from 'vue';
import {
  numbers, operators, FORM_ID, mathTestRegExp,
} from './constants';
import { type Calculation } from './types';

const display = ref('');
const calculations = ref<Calculation[]>([]);
const emit = defineEmits<{change: [value: string], submit: [value: string]}>();
function update(value: string|number) {
  display.value += value;
  emit('change', display.value);
}
function clear() {
  display.value = '';
  emit('change', display.value);
}
function clearLast() {
  display.value = display.value.slice(0, -1);
  emit('change', display.value);
}
function handleSubmit() {
  const operation = display.value;
  let value = null;
  const isWithOperator = operators.some((operator) => operation.includes(operator));
  if (!isWithOperator) {
    calculations.value.push({ operation, value });
    emit('submit', operation);
    return;
  }
  const isValidMathExpression = mathTestRegExp.test(operation);
  if (!isValidMathExpression) return;
  // eslint-disable-next-line no-eval
  value = `${eval(operation)}`;
  calculations.value.push({ operation, value });
  emit('submit', value);
  display.value = '';
}
defineExpose({ clear, calculations });
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
      <button @click.prevent="clearLast" class="error">DEL</button>
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
