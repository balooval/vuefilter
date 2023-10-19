class FilterValues {

  constructor({criterias, sessionKey = ''}) {
    this.valuesProps = criterias.map(initValue);
    this.sessionKey = 'filter-' + sessionKey;
    this.load();
  }

  addValue(id, value) {
    const valueProp = this.getValue(id);
    if (valueProp === undefined) {
      return;
    }
    valueProp.value = value;
  }

  getValue(id) {
    const valueProp = this.valuesProps.filter(value => value.id === id).pop();
    return valueProp;
  }

  reset(id) {
    const valueProp = this.getValue(id);
    valueProp.value = getDefaultValue(valueProp.type);
  }
  
  isActive(id) {
    const valueProp = this.getValue(id);
    const value = valueProp.value;

    if (valueProp.type === 'period') {
      return value.start !== null || value.end !== null;
    }

    return value.length > 0;
  }

  load() {
    const storedValue = JSON.parse(sessionStorage.getItem(this.sessionKey));
    if (storedValue === null) {
      return;
    }
    storedValue.forEach(prop => this.addValue(prop.id, prop.value));
  }

  persist() {
    sessionStorage.setItem(this.sessionKey, JSON.stringify(this.valuesProps))
  }

}

function initValue(criteria) {
  return {
    id: criteria.id,
    type: criteria.type,
    value: getDefaultValue(criteria.type),
  };
}

function getDefaultValue(type) {
  switch (type) {
    case 'freetext':
    case 'exclusivelist':
      return '';
    case 'checklist':
      return [];
    case 'period':
      return {
        start: null,
        end: null,
      };
  }
}

export default FilterValues;