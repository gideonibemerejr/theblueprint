export const ageGroupAdapter = ({ id, attributes }) => {
  return {
    label: attributes?.range,
    value: id,
  };
};

export const ageGroupsAdapter = (ageGroups) => {
  return ageGroups.map((group) => ageGroupAdapter({ ...group }));
};
