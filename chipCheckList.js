import {defineAsyncComponent , ref, reactive } from './vue3.js';

export default {

  props: {
    criteria: Object,
    valueProp: Object,
  },

  setup(props, context) {

    const criteriaData = props.criteria;
    const chosenValues = reactive(props.valueProp);


    function formatValues(valueObject) {
      const labels = valueObject.value.map(id => {
        return criteriaData.options.filter(option => option.id === id).pop().label;
      })
      return labels.join(', ');
    }

    function clear() {
      chosenValues.value = [];
      context.emit('clear', criteriaData);
    }

    return {
      criteriaData,
      chosenValues,
      formatValues,
      clear,
    };
  },

  template: `<div class="filter-chip">
      <div class="filter-chip-text">{{ criteriaData.label }} : {{ formatValues(chosenValues) }}</div> <button @click="clear">X</button>
    </div>`,

};