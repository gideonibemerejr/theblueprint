import queryString from 'query-string';
import { pickBy } from 'lodash';
import httpClient from '../utils/httpClient';

export const getEvents = (url) => {
  const params = queryString.stringify(
    pickBy({
      populate: '*',
    }),
    {
      encodeValuesOnly: true,
    }
  );
  return httpClient
    .get(`${url}?${params}`)
    .then((res) => ({ events: res.data.data, meta: res.data.meta }));
};
