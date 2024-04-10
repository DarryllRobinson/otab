import config from '../../_config/config';
import { fetchWrapper } from '../../_helpers';
const baseUrl = `${config.apiUrl}/boards`;

export const boardService = { getAll, getById, getBoardByCompUserId };

function getAll() {
  console.log('fetching all boards');
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getBoardByCompUserId(params) {
  console.log({ params });
  return fetchWrapper
    .post(`${baseUrl}/competition/user/`, params)
    .then((board) => {
      console.log('found board: ', board);
      return board;
    });
}
