export default {

  props: {
    criteria: Object,
    valueProp: Object,
  },

  template: `<div class="filter-chip">
    <div class="filter-chip-text">{{ criteria.label }} : "{{ valueProp.value }}"</div> <button @click="clear">X</button>
  </div>`,

  methods: { 
    clear: function() {
      this.valueProp.value = '';
      this.$emit('clear');
    },
  },
};