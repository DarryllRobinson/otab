import config from '../../_config/config';
import { fetchWrapper } from '../../_helpers';
const baseUrl = `${config.apiUrl}/songs`;

export const songService = {
  getAllByCompId,
};

async function getAllByCompId(id) {
  console.log('fetching all songs', id);
  return await fetchWrapper.get(`${baseUrl}/${id}`);
}
