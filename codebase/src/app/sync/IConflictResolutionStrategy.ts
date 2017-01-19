import {Article} from "../data/Article";

export interface IConflictResolutionStrategy {
  getName() : string;
  checkForConflicts(article: Article);
}
