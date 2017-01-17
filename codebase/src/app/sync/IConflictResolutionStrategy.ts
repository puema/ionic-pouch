export interface IConflictResolutionStrategy {
  resolveFor(id: string);
  checkForConflicts(document: any);
}
