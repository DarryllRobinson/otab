import { tileService } from "../Tiles/tile.service";

export default async function LoadBoard(boardId) {
  try {
    const records = await tileService.getTiles(boardId);
    return records || [];
  } catch (error) {
    console.error("Error fetching tiles: ", error);
    return [];
  }
}
