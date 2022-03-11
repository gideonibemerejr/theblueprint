import httpClient from "../utils/httpClient";
import { ageGroupsAdapter, userCountAdapter } from "../utils/adapters";
export const updateUser = (user) => {
	return httpClient.put(`/users/${user.id}`, user);
};

export const getAgeGroups = (url) => {
	return httpClient.get(`${url}`).then((res) => {
		const ageGroups = ageGroupsAdapter(res.data.data);
		return { ageGroups, meta: res.data.meta };
	});
};

export const getUserCount = (url) => {
	return httpClient.get(`${url}`).then((res) => {
		const userCount = userCountAdapter(res.data);
		return { userCount };
	});
};
