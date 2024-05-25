<script lang="ts">
import { ref, defineComponent } from 'vue';
import Calculator from './Calculator.vue';

export default defineComponent({
  components: { Calculator },
  props: {
    formId: String,
  },
  setup(props) {
    console.log(props);
    const historyList = ref([]);
    function handleSubmit() {
      console.log(historyList);
    }
    return {
      handleSubmit,
      historyList,
      props,
    };
  },
});
</script>

<template>
  <div>
    <div>
      <Calculator :id="props.formId" @submit.prevent="handleSubmit"  />
      <div class="display"></div>
    </div>
    <div class="footer">
      <button>import</button>
      <button>export</button>
      <button>clear</button>
    </div>
  </div>
</template>

<style scoped>

</style>
