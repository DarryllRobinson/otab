import config from "../../_config/config";
import { fetchWrapper } from "../../_helpers";
const baseUrl = `${config.apiUrl}/boards`;

export const boardService = {
  getAll,
  getById,
  getAllByUserId,
  getBoardByCompUserId,
  createBoard,
};

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(params) {
  return fetchWrapper.get(baseUrl, params);
}

function getAllByUserId(params) {
  return fetchWrapper.post(`${baseUrl}/user/`, params);
}

function getBoardByCompUserId(params) {
  return fetchWrapper
    .post(`${baseUrl}/competition/user/`, params)
    .then((board) => {
      return board;
    });
}

function createBoard(params) {
  return fetchWrapper.post(baseUrl, params);
}
