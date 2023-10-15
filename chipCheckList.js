export default {

  props: {
    criteria: Object,
    valueProp: Object,
  },

  template: `<div class="filter-chip">
      <div class="filter-chip-text">{{ criteria.label }} : {{ formatValues(valueProp.value) }}</div> <button @click="clear">X</button>
    </div>`,

  methods: { 
    clear: function() {
      this.valueProp.value = [];
      this.$emit('clear');
    },

    formatValues(values) {
      const labels = values.map(id => {
        return this.criteria.options.filter(option => option.id === id).pop().label;
      })
      return labels.join(', ');
    },
  },

};