import config from '../_config/config';
import { fetchWrapper } from '../_helpers';
const baseUrl = `${config.apiUrl}/boards`;

export const boardService = { retrieveBoard, retrieveBoards };

function retrieveBoard(id) {
  return fetchWrapper.post(`${baseUrl}/retrieveBoard`, id).then((board) => {
    console.log('Board: ', board);
    return board;
  });
}

function retrieveBoards(id) {
  console.log('fetching boards');
  return fetchWrapper.post(`${baseUrl}/retrieveBoards`).then((boards) => {
    console.log('Boards: ', boards);
    return boards;
  });
}
