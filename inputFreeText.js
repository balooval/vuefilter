export default {

  props: {
    criteria: Object,
    valueProp: Object,
  },

  data: function() {
    return {
      searchValue: '',
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

  methods: { 
    pickSuggestion: function(value) {
      this.searchValue = value;
      this.valid();
    },

    valid: function() {
      this.valueProp.value = this.searchValue;
      this.searchValue = '';
      this.$emit('changed', this.criteria);
    },
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