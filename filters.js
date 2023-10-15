import FilterValues from './filterValues.js';
import mixinClickOutside from './mixinClickOutside.js';

export default {

  props: {
    criterias: Array,
    filters: FilterValues,
  },

  mixins: [mixinClickOutside],

  components: {
    inputfreetext: () => import('./inputFreeText.js'),
    inputchecklist: () => import('./inputCheckList.js'),
    inputperiod: () => import('./inputPeriod.js'),
    chipfreetext: () => import('./chipFreeText.js'),
    chipchecklist: () => import('./chipCheckList.js'),
    chipperiod: () => import('./chipPeriod.js'),
  },

  data: function() {
    return {
      isOpen: false,
      openedCriteriaId: undefined,
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
          <component
            v-for="criteria in criterias"
            v-if="filters.isActive(criteria.id)"
            v-bind:is="'chip' + criteria.type"
            v-bind:key="criteria.id"
            v-bind:criteria="criteria"
            v-bind:valueProp="filters.getValue(criteria.id)"
            @clear="onFilterChanged"
          >
          </component>
        </div>

      </div>

      <div class="filter-input-zone">

        <div class="filter-criteria-list" v-if="isOpen">

          <div class="filter-criteria-labels">
            <div
              v-for="criteria in criterias"
              :title="criteriaTitle(criteria)"
              :class="{'filter-criteria-label': true, selected: openedCriteriaId === criteria.id, disabled: isCompatible(criteria.id) === false}"
              @click.stop="switchCriteriaVisibility(criteria.id)"
            >
              {{ criteria.label }}
            </div>
          </div>

          <component
            v-for="criteria in criterias"
            v-if="openedCriteriaId === criteria.id"
            v-bind:is="'input' + criteria.type"
            v-bind:key="criteria.id"
            :criteria="criteria"
            @changed="onFilterChanged"
            :valueProp="filters.getValue(criteria.id)"
            v-click-outside="() => switchCriteriaVisibility(criteria.id)"
          ></component>

      </div>
    </div>

  </div>`,

  methods: { 
    toggleOpenState: function() {
      this.isOpen = !this.isOpen;
    },

    switchCriteriaVisibility: function(criteriaId) {
      if (this.isCompatible(criteriaId) === false) {
        return;
      }
      if (criteriaId === this.openedCriteriaId) {
        this.openedCriteriaId = undefined;
        return;
      }
      
      this.openedCriteriaId = criteriaId;
    },

    onFilterChanged: function(criteria) {
      if (this.filters.isActive(criteria.id) === true) {
        this.clearIncompatibleCriterias(criteria);
      }
      this.filters.persist();
    },

    clearIncompatibleCriterias(criteria) {
      const incompatibleCriterias = criteria.incompatibleWith ?? [];
      incompatibleCriterias.forEach(criteriaId => this.filters.reset(criteriaId));
    },

    isCompatible: function(criteriaId) {
      const incompatiblesCriteria = this.criterias
      .filter(criteria => this.filters.isActive(criteria.id))
      .filter(criteria => criteria.incompatibleWith)
      .reduce((cum, cur) => {
        cum.push(...cur.incompatibleWith);
        return cum;
      }, []);

      return incompatiblesCriteria.includes(criteriaId) === false;
    },

    criteriaTitle: function(criteria) {
      let title = criteria.label;
      if (this.isCompatible(criteria.id) === false) {
        title += ' (incompatible avec un filtre en cours)';
      }

      return title;
    },
  },

};