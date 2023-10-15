export default {

  props: {
    criteria: Object,
    valueProp: Object,
  },

  data: function() {
    return {
      period: [this.valueProp.value.start, this.valueProp.value.end],
      isOpen: true,
      selectionMode: 'range',
    };
  },

  template: `<div>
      <date-picker
        :inline="true"
        :range="isRangeMode"
        :open="isOpen"
        :type="criteria.dateType"
        format="YYYY-MM-DD"
        value-type="YYYY-MM-DD"
        @change="onChange"
        v-model="period"
      >
        <template v-slot:header="{ emit }">
          <button :class="{active: selectionMode == 'from'}" @click="setSelectionMode('from')">A partir du</button>
          <button :class="{active: selectionMode == 'to'}" @click="setSelectionMode('to')">Jusqu'au</button>
          <button :class="{active: selectionMode == 'range'}" @click="setSelectionMode('range')">Période</button>
        </template>
    </date-picker>
  </div>`,

  methods: { 
    onChange: function() {
      switch (this.selectionMode) {
        case 'range':
          this.valueProp.value.start = this.period[0];
          this.valueProp.value.end = this.period[1];
          break;
        case 'from':
          this.valueProp.value.start = this.period;
          this.valueProp.value.end = null;
          break;
        case 'to':
          this.valueProp.value.start = null;
          this.valueProp.value.end = this.period;
          break;
      }
      this.isOpen = false;
      this.$emit('changed');
    },

    setSelectionMode: function(mode) {
      this.selectionMode = mode;
    },
  },

  computed: { 
    isRangeMode: function() {
      return this.selectionMode === 'range';
    },
  },

};