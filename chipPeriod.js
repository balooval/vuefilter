export default {

  props: {
    criteria: Object,
    valueProp: Object,
  },

  template: `<div class="filter-chip">
    <div class="filter-chip-text">
      {{ criteria.label }} : {{ textValue }}
    </div>
    <button @click="clear">X</button>
  </div>`,

  methods: { 
    clear: function() {
      this.valueProp.value = {
        start: null,
        end: null,
      };
      this.$emit('clear');
    },

    humanDate: function (value) {
      const tokens = value.split('-');
      return `${tokens[2]}/${tokens[1]}/${tokens[0]}`;
    },
  },

  computed: { 
    textValue: function() {
      const value = this.valueProp.value;
      
      if (value.end === null) {
        return 'Depuis le ' + this.humanDate(value.start);
      }
      
      if (value.start === null) {
        return 'Jusqu\'au ' + this.humanDate(value.end);
      }
      
      return 'Du ' + this.humanDate(value.start) + ' au ' + this.humanDate(value.end);
    },
  },
};