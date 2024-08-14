import config from '../../_config/config';
import { fetchWrapper } from '../../_helpers';
const baseUrl = `${config.apiUrl}/boards`;

export const boardService = { getAll, getAllByUserId, getBoardByCompUserId };

function getAll() {
  console.log('fetching all boards');
  return fetchWrapper.get(baseUrl);
}

function getAllByUserId(id) {
  // console.log('getAllByUserId id:', id);
  console.log('getAllByUserId url:', `${baseUrl}/${id}`);
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
