<script lang="ts">
import { ref } from 'vue';
import { numbers, operators, FORM_ID } from './constants';

export default {
  setup() {
    const display = ref('');
    function updateDisplay(value: string|number) {
      // if (value === 'AC') {
      //   return display.value = '';
      // }
      // if (value === 'DEL') {
      //   return display.value = display.value.slice(0, -1);
      // }
      display.value += value;
    }

    return {
      display,
      numbers,
      operators,
      updateDisplay,
      FORM_ID,
    };
  },
};
</script>

<template>
  <form :id="FORM_ID" class="calculator">
    <input type="text" v-model="display" disabled />

    <div class="numbers">
      <button
          v-for="{ value } in numbers"
          :key="value"
          @click.prevent="updateDisplay(value)"
      >
        {{ value }}
      </button>
    </div>
    <div class="operators">
      <button v-for="{ value } in operators" :key="value" @click.prevent="updateDisplay(value)">
        {{ value }}
      </button>
    </div>
  </form>
</template>

<style scoped>
input {
  display: none;
}
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

.button_clear {
  color: #e76f51;
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
