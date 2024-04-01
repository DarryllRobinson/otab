import config from '../../_config/config';
import { fetchWrapper } from '../../_helpers';
const baseUrl = `${config.apiUrl}/tiles`;

export const tileService = { getCurrentSong, recordSongChosen };

function getCurrentSong() {
  console.log('getting getCurrentSong');
  return { song: '16th song', artist: '16th Actual Artist' };
  //   return fetchWrapper.get(`${baseUrl}`);
}

function recordSongChosen(params) {
  return fetchWrapper.post(`${baseUrl}/record`, params).then((response) => {
    console.log('response: ', response);
  });
}
