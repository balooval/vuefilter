export default {

  props: {
    criteria: Object,
    valueProp: Object,
  },

  data: function() {
    return {
      visibleCriteriasCount: 4,
      viewAllOptions: false,
      optionFilter: '',
    };
  },
  
  template: `<div>
      <button @click="switchSelectAll">All</button> <input type="text" v-model="optionFilter">
      
      <div v-for="option in visibleOptions">
        <input
          type="checkbox"
          :id="option.id"
          :value="option.id"
          v-model="valueProp.value"
          @change="onChange"
        >
        <label :for="option.id">{{ option.label }}</label>
      </div>

      <div v-if="optionsAreLimited">
        <div @click="toggleViewAllOptions">
          Afficher {{ hiddenOptionsCount }} de plus
        </div>
      </div>

    </div>`,

  methods: { 
    onChange: function() {
      this.$emit('changed', this.criteria);
    },

    toggleViewAllOptions: function() {
      this.viewAllOptions = !this.viewAllOptions;
    },

    switchSelectAll: function() {
      if (this.valueProp.value.length === this.criteria.options.length) {
        this.selectNone();
      } else {
        this.selectAll();
      }
    },

    selectAll: function() {
      this.valueProp.value = this.criteria.options.map(option => option.id);
      this.$emit('changed');
    },

    selectNone: function() {
      this.valueProp.value = [];
      this.$emit('changed');
    },
  },
  
  computed: { 
    hiddenOptionsCount: function() {
      return this.criteria.options.length - this.visibleCriteriasCount;
    },

    visibleOptions: function() {
      let optionsToReturn = this.criteria.options;
      
      if (this.optionFilter !== '') {
        optionsToReturn = optionsToReturn.filter(option => option.label.toLowerCase().includes(this.optionFilter.toLowerCase()))
      }
      
      if (this.viewAllOptions === true) {
        return optionsToReturn;
      }

      return optionsToReturn.slice(0, this.visibleCriteriasCount)
    },
    
    optionsAreLimited: function() {
      if (this.optionFilter !== '') {
        return false;
      }
      return this.criteria.options.length > this.visibleOptions.length;
    }
  },
};