import config from '../_config/config';
import { fetchWrapper } from '../_helpers';
const baseUrl = `${config.apiUrl}/boards`;

export const boardService = { retrieve };

function retrieve(id) {
  return fetchWrapper.post(`${baseUrl}/retrieve`, id).then((board) => {
    console.log('Board: ', board);
    return board;
  });
}
