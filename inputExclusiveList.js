export default {

  props: {
    criteria: Object,
    valueProp: Object,
  },

  data: function() {
    return {
    };
  },
  
  template: `<div class="filter-criteria-input">
    <button @click="selectNone">None</button>

      <div v-for="option in criteria.options">
        <input
          type="radio"
          :id="option.id"
          :value="option.id"
          v-model="valueProp.value"
          @change="onChange"
        >
        <label :for="option.id">{{ option.label }}</label>
      </div>

    </div>`,

  methods: { 
    onChange: function() {
      this.$emit('changed', this.criteria);
    },

    selectNone: function() {
      this.valueProp.value = '';
    },
  },
};