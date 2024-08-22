import config from '../../_config/config';
import { fetchWrapper } from '../../_helpers';
const baseUrl = `${config.apiUrl}/tiles`;

export const tileService = { getSong, getTiles, create, update, getAll };

function getSong() {
  console.log('getting getSong');
  return { song: '16th song', artist: '16th Actual Artist' };
  //   return fetchWrapper.get(`${baseUrl}/get-song`);
}

function getAll() {
  console.log('getting it all');
  return fetchWrapper.get(baseUrl);
}

function getTiles(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  // console.log('creating tile params', params);
  return fetchWrapper.post(`${baseUrl}/create`, params);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params);
}
