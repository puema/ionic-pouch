export interface IConflictResolutionStrategy {
  getName() : string;
  checkForConflicts(document: any);
}
