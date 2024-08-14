import config from '../../_config/config';
import { fetchWrapper } from '../../_helpers';
const baseUrl = `${config.apiUrl}/boards`;

export const boardService = {
  getAll,
  getById,
  getAllByUserId,
  getBoardByCompUserId,
};

function getAll() {
  console.log('fetching all boards');
  return fetchWrapper.get(baseUrl);
}

function getById(params) {
  console.log('fetching board by id: ', params);
  return fetchWrapper.post(baseUrl, params);
}

function getAllByUserId(params) {
  console.log('getAllByUserId params:', params);
  return fetchWrapper.post(`${baseUrl}/user/`, params);
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
