import config from '../../_config/config';
import { fetchWrapper } from '../../_helpers';
const baseUrl = `${config.apiUrl}/tiles`;

export const tileService = { getCurrentSong };

function getCurrentSong() {
  console.log('getting getCurrentSong');
  return fetchWrapper.get(`${baseUrl}`);
}
