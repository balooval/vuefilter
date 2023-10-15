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
    <input type="text" v-model="searchValue" ref="input"> <button @click="valid">OK</button>
  </div>`,

  mounted() {
    this.$refs.input.focus();
  },

  methods: { 
    valid: function() {
      this.valueProp.value = this.searchValue;
      this.searchValue = '';
      this.$emit('changed', this.criteria);
    },
  },

};