import config from '../../_config/config';
import { fetchWrapper } from '../../_helpers';
const baseUrl = `${config.apiUrl}/tiles`;

export const tileService = { getSong, updateTile };

function getSong() {
  console.log('getting getSong');
  return { song: '16th song', artist: '16th Actual Artist' };
  //   return fetchWrapper.get(`${baseUrl}/get-song`);
}

function updateTile(id, params) {
  console.log('updateTile params: ', params);
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then((tile) => {
    return tile;
  });
}
