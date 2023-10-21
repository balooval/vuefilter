import {ref} from './vue3.js';

export default {

  props: {
    criteria: Object,
    valueProp: Object,
  },

  setup(props, context) {

    const visibleCriteriasCount = ref(4);
    const viewAllOptions = ref(false);
    const optionFilter = ref('');

    function onChange() {
      context.emit('changed', props.criteria);
    }

    function toggleViewAllOptions() {
      viewAllOptions.value = !viewAllOptions.value;
    }

    function switchSelectAll() {
      if (props.valueProp.value.length === props.criteria.options.length) {
        selectNone();
      } else {
        selectAll();
      }
    }

    function selectAll() {
      props.valueProp.value = props.criteria.options.map(option => option.id);
      context.emit('changed', props.criteria);
    }

    function selectNone() {
      props.valueProp.value = [];
      context.emit('changed', props.criteria);
    }

    return {
      visibleCriteriasCount,
      viewAllOptions,
      optionFilter,
      onChange,
      toggleViewAllOptions,
      switchSelectAll,
      selectAll,
      selectNone,
    };
  },
  
  template: `<div class="filter-criteria-input">
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

      <div v-if="optionsAreLimited" @click.stop="toggleViewAllOptions">
        Afficher {{ hiddenOptionsCount }} de plus
      </div>

    </div>`,
  
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