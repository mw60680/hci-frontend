export const filterNonEmptyValues = (object: { [key: string]: any }) => {
  const filteredValues: { [key: string]: any } = {};

  for (const [key, val] of Object.entries(object)) {
    if (typeof val === 'boolean') filteredValues[key] = val;
    else if (val) filteredValues[key] = val;
  }

  return filteredValues;
};
