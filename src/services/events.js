import httpClient from '../utils/httpClient';

export const getEvents = (url) => {
  return httpClient
    .get(`${url}`)
    .then((res) => ({ events: res.data.data, meta: res.data.meta }));
};

export const createEvent = (newEvent) => {
  return httpClient
    .post(`/blue-sheet-events`, { data: newEvent })
    .then((res) => console.log('THE RESPONSE FROM EVENT CREATION', res));
};
