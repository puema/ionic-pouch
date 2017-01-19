import {Article} from "../data/Article";

export class Conflict {
  public currentWinner: Article;
  public conflicts: Article[];

  constructor(currentWinner: Article, conflicts: Article[]) {
    this.currentWinner = currentWinner;
    this.conflicts = conflicts;
  }
}
