import {defineAsyncComponent , ref, reactive } from './vue3.js';
import FilterValues from './filterValues.js';
import mixinClickOutside from './mixinClickOutside.js';

export default {

  props: {
    criteriasprop: Array,
    filters: FilterValues,
  },

  mixins: [mixinClickOutside],

  components: {
    inputchecklist: defineAsyncComponent(() => import('./inputCheckList.js')),
    inputexclusivelist: defineAsyncComponent(() => import('./inputExclusiveList.js')),
    inputfreetext: defineAsyncComponent(() => import('./inputFreeText.js')),
    inputperiod: defineAsyncComponent(() => import('./inputPeriod.js')),
    chipexclusivelist: defineAsyncComponent(() => import('./chipExclusiveList.js')),
    chipchecklist: defineAsyncComponent(() => import('./chipCheckList.js')),
    chipfreetext: defineAsyncComponent(() => import('./chipFreeText.js')),
    chipperiod: defineAsyncComponent(() => import('./chipPeriod.js')),
  },

  setup(props) {

    const criteriasData = reactive(props.criteriasprop);
    const filtersData = reactive(props.filters);
    let isOpen = ref(false);
    let openedCriteriaId = ref(null);

    function toggleOpenState() {
      isOpen.value = !isOpen.value;
    }

    function switchCriteriaVisibility(criteriaId) {
      if (isCompatible(criteriaId) === false) {
        return;
      }
      if (criteriaId === openedCriteriaId.value) {
        openedCriteriaId.value = null;
        return;
      }
      
      openedCriteriaId.value = criteriaId;
    }

    function isCompatible(criteriaId) {
      const incompatiblesCriteria = criteriasData
      .filter(criteria => filtersData.isActive(criteria.id))
      .filter(criteria => criteria.incompatibleWith)
      .reduce((cum, cur) => {
        cum.push(...cur.incompatibleWith);
        return cum;
      }, []);
      return incompatiblesCriteria.includes(criteriaId) === false;
    }


    function onFilterChanged(criteria) {
      if (filtersData.isActive(criteria.id) === true) {
        clearIncompatibleCriterias(criteria);
      }
      filtersData.persist();
    }

    function clearIncompatibleCriterias(criteria) {
      const incompatibleCriterias = criteria.incompatibleWith ?? [];
      incompatibleCriterias.forEach(criteriaId => filtersData.reset(criteriaId));
    }

    function criteriaTitle(criteria) {
      let title = criteria.label;
      if (isCompatible(criteria.id) === false) {
        title += ' (incompatible avec un filtre en cours)';
      }
      return title;
    }

    return {
      filtersData,
      switchCriteriaVisibility,
      criteriasData,
      isOpen,
      openedCriteriaId,
      toggleOpenState,
      criteriaTitle,
      onFilterChanged,
      isCompatible,
    };
  },
  
  template: `<div class="filter-container">
      
      <div class="filter-resume-zone">
        <div
            class="filter-main-button"
            @click="toggleOpenState"
          >
          F
        </div>

        <div class="filter-current-search-container">
          <div v-for="criteriaItem in criteriasData">
            <component
              v-if="filtersData.isActive(criteriaItem.id)"
              v-bind:is="'chip' + criteriaItem.type"
              v-bind:key="criteriaItem.id"
              v-bind:criteria="criteriaItem"
              v-bind:valueProp="filtersData.getValue(criteriaItem.id)"
              @clear="onFilterChanged"
            >
            </component>
          </div>
        </div>

      </div>

      <div class="filter-input-zone">

        <div class="filter-criteria-list" v-if="isOpen">

          <div class="filter-criteria-labels">
            <div
              v-for="criteriaItem in criteriasData"
              :title="criteriaTitle(criteriaItem)"
              :class="{'filter-criteria-label': true, selected: openedCriteriaId === criteriaItem.id, disabled: isCompatible(criteriaItem.id) === false}"
              @click.stop="switchCriteriaVisibility(criteriaItem.id)"
            >
              {{ criteriaItem.label }}
            </div>
          </div>

          <div v-for="criteriaItem in criteriasData">
            <component
              v-if="openedCriteriaId === criteriaItem.id"
              v-bind:is="'input' + criteriaItem.type"
              v-bind:key="criteriaItem.id"
              :criteria="criteriaItem"
              @changed="onFilterChanged"
              :valueProp="filtersData.getValue(criteriaItem.id)"
              v-click-outside="() => switchCriteriaVisibility(criteriaItem.id)"
            ></component>

        </div>
      </div>
    </div>

  </div>`,

};