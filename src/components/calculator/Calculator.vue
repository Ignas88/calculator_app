<script setup lang="ts">
import {
  ref, defineEmits, defineExpose,
} from 'vue';
import {
  numbers, operators, FORM_ID, mathTestRegExp,
} from './constants';

const display = ref('');
const emit = defineEmits<{change: [value: string], submit: [operation: string, value?: string]}>();
function update(value: string|number) {
  display.value += value;
  emit('change', display.value);
}
function clear() {
  display.value = '';
  emit('change', display.value);
}
function deleteLast() {
  display.value = display.value.slice(0, -1);
  emit('change', display.value);
}
function handleSubmit() {
  const isWithOperator = operators.some((operator) => display.value.includes(operator));
  if (!isWithOperator) {
    emit('submit', display.value);
    return;
  }
  const isValidMathExpression = mathTestRegExp.test(display.value);
  if (!isValidMathExpression) return;
  // eslint-disable-next-line no-eval
  const result = `${eval(display.value)}`;
  emit('submit', display.value, result);
  display.value = '';
}
defineExpose({ clear, deleteLast });
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
