import {ref} from './vue3.js';

export default {

  props: {
    criteria: Object,
    valueProp: Object,
  },

  setup(props, context) {

    const searchValue = ref('');

    function pickSuggestion(value) {
      searchValue.value = value;
      valid();
    }

    function valid() {
      props.valueProp.value = searchValue.value;
      searchValue.value = '';
      context.emit('changed', props.criteria);
    }

    return {
      pickSuggestion,
      valid,
      searchValue,
    };
  },

  template: `<div class="filter-criteria-input">
    <input type="text" v-model="searchValue" ref="input"> <button @click="valid">OK</button>
    <div v-for="suggestion in suggestions">
      <div @click="pickSuggestion(suggestion)">{{ suggestion }}</div>
    </div>
  </div>`,

  mounted() {
    this.$refs.input.focus();
  },

  computed: { 
    suggestions: function() {
      if (this.searchValue.trim() === '') {
        return [];
      }
      if (!this.criteria.suggestions) {
        return [];
      }
      return this.criteria.suggestions.filter(suggestion => {
        return suggestion.toLowerCase().includes(this.searchValue.toLowerCase());
      });
    },
  },

};