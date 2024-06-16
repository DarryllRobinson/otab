import config from '../../_config/config';
import { fetchWrapper } from '../../_helpers';
const baseUrl = `${config.apiUrl}/tiles`;

export const tileService = { getSong, create, update };

function getSong() {
  console.log('getting getSong');
  return { song: '16th song', artist: '16th Actual Artist' };
  //   return fetchWrapper.get(`${baseUrl}/get-song`);
}

function create(params) {
  return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params);
}
