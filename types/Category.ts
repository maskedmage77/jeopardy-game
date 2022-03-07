import ClueArray from "./ClueArray";

export default interface Category {
  title: string;
  id: number;
  clues: ClueArray;
}