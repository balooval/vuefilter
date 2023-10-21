
export function filterDatas(rowDatas, valuesToApply) {
  let res = [...rowDatas];

  valuesToApply.forEach(prop => {
    const filterFunction = getFilterFunction(prop.type);
    res = res.filter(row => filterFunction(row, prop.id, prop.value));
  });
        
  return res;
}

function getFilterFunction(propType) {
  switch (propType) {
    case 'freetext':
    case 'exclusivelist':
      return filterFreeText;
    case 'checklist':
      return filterChecklist;
    case 'period':
      return filterPeriod;
  }

  console.warn(`Filter type "${propType}" not supported`);
  return () => true;
}

function filterFreeText(row, propId, propValue) {
  if (propValue === '') {
    return true;
  }
  const rowValue = getRowValue(row, propId);
  return rowValue.toLowerCase().includes(propValue.toLowerCase());
}

function filterChecklist(row, propId, propValue) {
  if (propValue.length === 0) {
    return true;
  }
  const rowValue = getRowValue(row, propId);
  return propValue.includes(rowValue);
}

function filterPeriod(row, propId, propValue) {
  const rowValue = getRowValue(row, propId);
  const startDate = new Date(propValue.start ?? '1900-01-01');
  const endDate = new Date(propValue.end ?? '2099-12-31');
  const currentDate = new Date(rowValue);

  if (startDate > currentDate) {
    return false;
  }

  if (endDate < currentDate) {
    return false;
  }

  return true;
}

function getRowValue(row, propId) {
  const tokens = propId.split('.');
  let value = row;

  for (const token of tokens) {
    value = value[token];
  }

  return value;
}