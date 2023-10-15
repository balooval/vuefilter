export default {

  props: {
    criteria: Object,
    valueProp: Object,
  },

  data: function() {
    return {
      searchValue: '',
    };
  },

  template: `<div>
    <input type="text" v-model="searchValue"> <button @click="valid">OK</button>
  </div>`,

  methods: { 
    valid: function() {
      this.valueProp.value = this.searchValue;
      this.searchValue = '';
      this.$emit('changed');
    },
  },

};