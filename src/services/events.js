import httpClient from "../utils/httpClient";
import { eventCountAdapter, staffPickCountAdapter } from "../utils/adapters";

export const getEvents = (url) => {
	return httpClient
		.get(`${url}`)
		.then((res) => ({ events: res.data.data, meta: res.data.meta }));
};

export const createEvent = (newEvent) => {
	return httpClient
		.post(`/blue-sheet-events`, { data: newEvent })
		.then((res) => console.log("THE RESPONSE FROM EVENT CREATION", res));
};

export const getEventCount = (url) => {
	return httpClient.get(`${url}`).then((res) => {
		const eventCount = eventCountAdapter(res.data);
		return { eventCount };
	});
};

export const getStaffPickCount = (url) => {
	return httpClient.get(`${url}`).then((res) => {
		const staffPickCount = staffPickCountAdapter(res.data);
		return { staffPickCount };
	});
};
