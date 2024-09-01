import config from '../../_config/config';
import { fetchWrapper } from '../../_helpers';
const baseUrl = `${config.apiUrl}/boards`;

export const boardService = {
  getAll,
  getById,
  getAllByUserId,
  getBoardByCompUserId,
  create,
};

function getAll() {
  console.log('fetching all boards');
  return fetchWrapper.get(baseUrl);
}

function getById(params) {
  console.log('fetching board by id: ', params);
  return fetchWrapper.get(baseUrl, params);
}

function getAllByUserId(params) {
  // console.log('getAllByUserId params:', params);
  // console.log('getAllByUserId url:', `${baseUrl}/user/`);
  return fetchWrapper.post(`${baseUrl}/user/`, params);
}

function getBoardByCompUserId(params) {
  console.log('getBoardByCompUserId: ', params);
  return fetchWrapper
    .post(`${baseUrl}/competition/user/`, params)
    .then((board) => {
      console.log('found board: ', board);
      return board;
    });
}

function create(params) {
  console.log('create: ', params);
  return fetchWrapper.post(baseUrl, params);
}
