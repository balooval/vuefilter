import {watch, ref, toRef} from './vue3.js';
import FilterValues from './filterValues.js';
import {filterDatas} from './rowFilter.js';

export default {

  props: {
    rowdatas: Array,
    filtersvalues: FilterValues,
  },

  setup(props) {
    const dataToFilter = toRef(props, 'rowdatas');
    const filteredRows = ref([]);
    
    watch(dataToFilter, applyFilters);
    watch(props.filtersvalues.valuesProps, applyFilters, { immediate: true });
    
    function applyFilters() {
      const res = filterDatas(props.rowdatas, props.filtersvalues.valuesProps);
      filteredRows.value = [...res];
    }

    return {
      filteredRows
    };
  },
  
  template: `<div>
    {{ filteredRows.length }} lignes
    <div v-for="row in filteredRows">
      {{ row }}
    </div>
  </div>`,

};