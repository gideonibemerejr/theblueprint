import httpClient from '../utils/httpClient';
import { ageGroupsAdapter } from '../utils/adapters';
export const updateUser = (user) => {
  return httpClient.put(`/users/${user.id}`, user);
};

export const getAgeGroups = (url) => {
  return httpClient.get(`${url}`).then((res) => {
    console.log('ageGroups', res.data.data);
    const ageGroups = ageGroupsAdapter(res.data.data);
    return { ageGroups, meta: res.data.meta };
  });
};
